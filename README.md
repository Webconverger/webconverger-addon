# Webconverger addon for Firefox

Curated by [Mike Kaply](http://consulting.kaply.com/)
[@mikekaply](http://twitter.com/MikeKaply)

The common idea is to limit the Firefox browser to functions for kiosk style
(non-personal) browsing. Limit most Firefox features to convey simplicity,
familiarity and [principle of least
astonishment](http://en.wikipedia.org/wiki/Principle_of_least_astonishment).

Used in "Enterprise" deployments, schools, libraries, signs, shops and banks!

<https://webconverger.org/kiosk/> shows how it is used in the Webconverger Linux distribution.

For developing you might need to set `xpinstall.signatures.required` to **false**, like so:

	cat /usr/lib/firefox/browser/defaults/preferences/webc.js
	pref("xpinstall.signatures.required", false);

# Security

Found a way to circumvent the extension? [Please let us know](https://webconverger.org/security/)!

Many thanks to security researcher and "kiosk hacker" [Paul
Craig](http://security-assessment.com) for his review.

## Mozilla addons listing

<https://addons.mozilla.org/en-US/firefox/addon/webconverger/>

# Testing on Archlinux

Copy preferences to `/usr/lib/firefox/browser/defaults/preferences/webc.js`.

# Webconverger preferences

* `extensions.webconverger.showprintbutton` - boolean whether to show clickable icon to print page (alternative is ctrl+p), see <https://webconverger.org/printing/>
* `extensions.webconverger.nobrand` - boolean, see [new logo blog](https://webconverger.org/blog/2014/New_logo/)
* `extensions.webconverger.whitelist` - comma separated domains see https://github.com/Webconverger/webconverger-addon/pull/25 for details
* `extensions.webconverger.tabswitchinterval` - seconds between switching tabs (TODO: integrate with Neon)
* `extensions.webconverger.kioskresetstation` - **UNUSED** re-implementation of <https://github.com/Webconverger/webc/blob/master/usr/bin/kioskresetstation>
* `extensions.webconverger.forcesafesearch` - boolean to force searches to be safe, basically avoiding the case whereby someone searches for "boobs" on Image search
* `extensions.webconverger.themeURL`, for example: `pref("extensions.webconverger.themeURL", "http://s.natalian.org.s3.amazonaws.com/2016-06-06/persona.json");`
### Basic Proxy authentication

When used together:

* `extensions.webconverger.proxyusername`
* `extensions.webconverger.proxypassword`

# Neon bg.png when network lost

Ensure the symlink is present:

	/etc/webc/extensions/neon/content/bg.png -> /home/webc/bg.png

# Debug tips

Add to your `/usr/lib/firefox/browser/defaults/preferences/webc.js`:

	pref("browser.dom.window.dump.enabled", true);

Then in your JS, use `dump()` to print to stderr after running `firefox http://example.com` upon a terminal.

# Telemetry

The annoying **Choose What I Share** dialog is disabled in <https://github.com/Webconverger/webc/blob/master/opt/firefox/browser/defaults/preferences/webconverger.js>


