function doNothing(){}

// Close tab event
function tabRemoved(event)
{

	// Get number of tabs
	var num = gBrowser.browsers.length;

	// If there are two tabs, the second tab has no title and the closed tab
	// does have a title (ie is not the same tab) then close the browser

	if ((num == 2) && (! gBrowser.getBrowserAtIndex(1).contentTitle) && event.target.linkedBrowser.contentTitle)
	{ goQuitApplication(); }

	if ((num == 2) && (! gBrowser.getBrowserAtIndex(0).contentTitle))
	{ goQuitApplication(); }

}

function webcRestart() {

	document.persist("nav-bar", "currentset");
	// Add close tab listener, gBrowser has not been initiated by this point
	getBrowser().tabContainer.addEventListener("TabClose", tabRemoved, false);
	BrowserStartup();

}
