# Webconverger addon for Firefox/Iceweasel

Curated by [Mike Kaply](http://consulting.kaply.com/) [@mikekaply](http://twitter.com/MikeKaply)

The common idea is to limit the Firefox browser to functions for kiosk style
browsing. Limit most Firefox features to convey simplicity, familiarity and
[principle of least
astonishment](http://en.wikipedia.org/wiki/Principle_of_least_astonishment).

Used in "Enterprise" deployments, schools, libraries, signs, shops and banks!

<http://webconverger.org/kiosk/> shows how it is used in the Webconverger Linux distribution.

# Security

Found a way to circumvent the extension? [Please let us know](http://webconverger.org/security/)!

Many thanks to security researcher and "kiosk hacker" [Paul
Craig](http://security-assessment.com) for his contributions.

## Mozilla addons listing

<https://addons.mozilla.org/en-US/firefox/addon/webconverger/>

# Testing on Archlinux

Copy preferences to `/usr/lib/firefox/browser/defaults/preferences/webc.js`.

# Webconverger preferences

* extensions.webconverger.showprintbutton - boolean
* extensions.webconverger.whitelist - comma separated domains see https://github.com/Webconverger/webconverger-addon/pull/25
