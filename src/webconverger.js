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

function BrowserLoadURL(aTriggeringEvent, aPostData) {
  var url = gURLBar.value;

  if (url.match(/^file:/) || url.match(/^\//) || url.match(/^resource:/) || url.match(/^about:/)) {
	alert("Access to this protocol has been disabled!");
	return;
  }


  if (aTriggeringEvent instanceof MouseEvent) {
	if (aTriggeringEvent.button == 2)
	  return; // Do nothing for right clicks

	// We have a mouse event (from the go button), so use the standard
	// UI link behaviors
	openUILink(url, aTriggeringEvent, false, false, true /* allow third party fixup */, aPostData);
	return;
  }

  if (aTriggeringEvent && aTriggeringEvent.altKey) {
	handleURLBarRevert();
	content.focus();
	gBrowser.loadOneTab(url, null, null, aPostData, false,
						true /* allow third party fixup */);
	aTriggeringEvent.preventDefault();
	aTriggeringEvent.stopPropagation();
  }
  else
	loadURI(url, null, aPostData, true /* allow third party fixup */);

  focusElement(content);
}
