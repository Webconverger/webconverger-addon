(function() {
	function startup() {
		window.removeEventListener("load", startup, false);
		var navigatorToolbox = document.getElementById("navigator-toolbox");
		navigatorToolbox.iconsize = "small";
		navigatorToolbox.setAttribute("iconsize", "small");
		var reloadButton = document.getElementById("reload-button");
		if (reloadButton) {
			reloadButton.style.visibility = "visible";
		}
		var stopButton = document.getElementById("stop-button");
		if (stopButton) {
			stopButton.style.visibility = "visible";
		}

    var tabSwitchInterval = 0;
    try {
        tabSwitchInterval = Services.prefs.getIntPref("extensions.webconverger.tabswitchinterval");
    } catch (e) {}
    if (tabSwitchInterval > 0) {
      window.setInterval(function() {
        var visibleTabs = gBrowser.visibleTabs;
        if (visibleTabs.length == 1) {
          // Don't do anything if there is only one tab
          return;
        }
        var selectedIndex = visibleTabs.indexOf(gBrowser.selectedTab);
        selectedIndex = selectedIndex +1;
        if (selectedIndex == visibleTabs.length) {
          selectedIndex = 0;
        }
        gBrowser.selectTabAtIndex(selectedIndex);
      }, tabSwitchInterval);
    }
	}

	function shutdown() {
		window.removeEventListener("unload", shutdown, false);
	}

	window.addEventListener("load", startup, false);
	window.addEventListener("unload", shutdown, false);
})();

// Disable shift click from opening window
// Fixes https://github.com/Webconverger/webconverger-addon/issues/18
var ffWhereToOpenLink = whereToOpenLink;

whereToOpenLink = function(e, ignoreButton, ignoreAlt) {
	var where = ffWhereToOpenLink(e, ignoreButton, ignoreAlt);
	if (where == "window") {
		where = "tab";
	}
	return where;
}

