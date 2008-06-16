/* Webconverger.com
*/

pref("accessibility.typeaheadfind.flashBar", 0);
pref("app.update.enabled", false);
pref("browser.download.dir", "/tmp");
pref("browser.download.manager.useWindow", false);
pref("browser.download.show_plugins_in_list", false);
pref("browser.download.downloadDir", "/tmp");
pref("browser.download.folderList", 2);
pref("browser.download.lastDir", "/tmp");
pref("browser.history_expire_days.mirror", 1);
pref("browser.preferences.advanced.selectedTabIndex", 2);
pref("browser.startup.homepage_override.mstone", "ignore");
pref("browser.startup.page", 3);
pref("browser.tabs.autoHide", false);
pref("browser.tabs.closeButtons", 3);
pref("browser.tabs.tabMinWidth", 0);
pref("browser.tabs.warnOnClose", false);
pref("browser.tabs.warnOnOpen", false);
pref("browser.urlbar.hideGoButton", true);
pref("network.cookie.prefsMigrated", true);
pref("pref.advanced.javascript.disable_button.advanced", false);
pref("pref.privacy.disable_button.view_cookies", false);
pref("security.warn_entering_secure", false);
pref("security.warn_leaving_secure", false);
pref("security.warn_submit_insecure", false);
pref("signon.rememberSignons", false);


// This is the Webconverger specific preferences file for Iceweasel
// You can make any change in here, it is the purpose of this file.
// You can, with this file and all files present in the
// /etc/iceweasel/pref directory, override any preference that is
// present in /usr/lib/iceweasel/defaults/pref directory.
// While your changes will be kept on upgrade if you modify files in
// /etc/iceweasel/pref, please note that they won't be kept if you
// do them in /usr/lib/iceweasel/defaults/pref.

// Update via APT
pref("extensions.update.enabled", false);

// Use LANG environment variable to choose locale
pref("intl.locale.matchOS", true);

// Disable default browser checking.
pref("browser.shell.checkDefaultBrowser", false);

// Make sure new windows open in a tab
pref("browser.link.open_newwindow", 3);
pref("browser.link.open_external",3);
pref("browser.link.open_newwindow.restriction", 0);

// COMMENT OUT to disable print dialog
// pref("print.always_print_silent",true);
// pref("print.show_print_progress",false);

// Spell check all fields
pref("layout.spellcheck.default", 2)

// FF3
pref("browser.sessionstore.enabled", false);
pref("browser.sessionstore.resume_from_crash", false);
pref("xpinstall.enabled", false);
