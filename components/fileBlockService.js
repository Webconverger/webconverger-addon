const {classes: Cc, interfaces: Ci, utils: Cu} = Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

function FileBlock() {}

FileBlock.prototype = {
  appDir: null,
  profileDir: null,
  tempDir: null,
  // Specify which about pages are allowed, such as "home" or "newtab"
  // "*" means that all about pages are allowed
  // about:blank, about:neterror and about:certerror are always allowed
  aboutWhitelist: ["home"],
  // Specify any schemes/protocols that are not allowed
  schemeBlacklist: ["irc"],
  whitelist: [], // Regex value - Everything on the whitelist is always allowed. 
  blacklist: [], // Regex value - If site has not been allowed otherwise, it's blocked
  initialize: function() {
    this.appDir = Services.io.newFileURI(Services.dirsvc.get("CurProcD", Ci.nsIFile)).spec;
    this.profileDir = Services.io.newFileURI(Services.dirsvc.get("ProfD", Ci.nsIFile)).spec;
    this.tempDir = Services.io.newFileURI(Services.dirsvc.get("TmpD", Ci.nsIFile)).spec;
  },
  shouldLoad: function(aContentType, aContentLocation, aRequestOrigin, aContext, aMimeTypeGuess, aExtra) {
    if (!this.appDir) {
      this.initialize();
    }
    // We need to allow access to any files in the profile directory,
    // application directory or the temporary directory. Without these,
    // Firefox won't start
    if (aContentLocation.spec.match(this.profileDir) ||
        aContentLocation.spec.match(this.appDir) ||
        aContentLocation.spec.match(this.tempDir)) {
      return Ci.nsIContentPolicy.ACCEPT;
    }
    // Allow everything on the whitelist first
    if (this.whitelist.length > 0) {
      for (var i=0; i < this.whitelist.length; i++) {
        var regex = new RegExp(this.whitelist[i]);
        if (regex.test(aContentLocation.spec))
          return Ci.nsIContentPolicy.ACCEPT;
      }
    }
    // Prevent the loading of chrome URLs into the main browser window
    if (aContentLocation.scheme == "chrome") {
      if (aRequestOrigin &&
          (aRequestOrigin.spec == "chrome://browser/content/browser.xul" ||
          aRequestOrigin.scheme == "moz-nullprincipal")) {
        return Ci.nsIContentPolicy.REJECT_REQUEST;
      }
      return Ci.nsIContentPolicy.ACCEPT;
    }
    // Prevent the loading of resource files into the main browser window
    if (aContentLocation.scheme == "resource") {
      if (aRequestOrigin && aRequestOrigin.scheme == "moz-nullprincipal") {
        return Ci.nsIContentPolicy.REJECT_REQUEST;
      }
      return Ci.nsIContentPolicy.ACCEPT;
    }
    // Only load about URLs that are on the whitelist
    if (aContentLocation.scheme == "about") {
      if ((this.aboutWhitelist.length == 1 &&
          this.aboutWhitelist[0] == "*") ||
          /^about:certerror/.test(aContentLocation.spec) ||
          /^about:neterror/.test(aContentLocation.spec) ||
          /^about:blank/.test(aContentLocation.spec)) {
        return Ci.nsIContentPolicy.ACCEPT;
      }
      for (var i=0; i<this.aboutWhitelist.length; i++) {
        if (aContentLocation.spec == "about:" + this.aboutWhitelist[i]) {
          return Ci.nsIContentPolicy.ACCEPT;
        }
      }
      return Ci.nsIContentPolicy.REJECT_REQUEST;
    }
    // We allow all data URLs
    if (aContentLocation.scheme == "data") {
        return Ci.nsIContentPolicy.ACCEPT;
    }
    // Deny protocols that aren't allowed
    if (this.schemeBlacklist.length > 0) {
      for (var i=0; i < this.schemeBlacklist.length; i++) {
        if (aContentLocation.scheme == this.schemeBlacklist[i]) {
          return Ci.nsIContentPolicy.REJECT_REQUEST;
        }
      }
    }
    // Deny everything on the blacklist
    if (this.blacklist.length > 0) {
      for (var i=0; i < this.blacklist.length; i++) {
        var regex = new RegExp(this.blacklist[i]);
        if (regex.test(aContentLocation.spec))
          return Ci.nsIContentPolicy.REJECT;
      }
    }
    // Once we've parsed the lists, deny all files
    // This allows files to be whitelisted
    if (aContentLocation.scheme == "file") {
        return Ci.nsIContentPolicy.REJECT_REQUEST;
    }
    // If we had a whitelist, reject everything else
    if (this.whitelist.length > 0) {
      return Ci.nsIContentPolicy.REJECT;
    }
    // If we had a blacklist, accept everything else
    if (this.blacklist.length > 0) {
      return Ci.nsIContentPolicy.ACCEPT;
    }
    // If there is no whitelist or blacklist, allow everything (because we denied file URLs)
    return Ci.nsIContentPolicy.ACCEPT;
  },
  shouldProcess: function(aContentType, aContentLocation, aRequestOrigin, aContext, aMimeTypeGuess, aExtra) {
    return Ci.nsIContentPolicy.ACCEPT;
  },
  classDescription: "FileBlock Service",
  contractID: "@kaply.com/fileblock-service;1",
  classID: Components.ID('{cbea9627-60c0-4718-8545-72a6c3c4b8a3}'),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy])
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([FileBlock]);
