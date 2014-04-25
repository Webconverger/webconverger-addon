Components.utils.import("resource://gre/modules/Services.jsm");

function installButton(toolbarId, id) {
	var toolbar = document.getElementById(toolbarId);
	var before = null;
	toolbar.insertItem(id, before);
	toolbar.setAttribute("currentset", toolbar.currentSet);
	document.persist(toolbar.id, "currentset");
}

(function() {
	function startup() {
		var navigatorToolbox = document.getElementById("navigator-toolbox");
		navigatorToolbox.iconsize = "small";
		navigatorToolbox.setAttribute("iconsize", "small");
		var reloadButton = document.getElementById("reload-button");
		reloadButton.style.visibility = "visible";
		var stopButton = document.getElementById("stop-button");
		stopButton.style.visibility = "visible";
		var showPrintButton = false;
		try {
			showPrintButton = Services.prefs.getBoolPref("extensions.webconverger.showprintbutton");
		} catch (e) {}
		if (showPrintButton) {
			document.getElementById("wc-print").removeAttribute("hidden");
		}
		window.removeEventListener("load", startup, false);
	}

	function shutdown() {
		window.removeEventListener("unload", shutdown, false);
	}

	window.addEventListener("load", startup, false);
	window.addEventListener("unload", shutdown, false);
})();

