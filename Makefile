SRC := webcnoaddressbar webconverger webcfullscreen neon
CHROOT := /home/hendry/debian/jessie-chroot/root/Debian-Live-config/webconverger/chroot

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	@mkdir -p defaults/preferences/
	cp src/$@-prefs.js defaults/preferences/prefs.js
	@mkdir -p extensions
	rsync -art chrome.manifest modules content install.rdf defaults components extensions/$@
	zip -r $@.xpi chrome.manifest content install.rdf defaults components modules

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js defaults/
	rm -rf extensions

deploy: all
	sudo rsync --delete -art extensions/* $(CHROOT)/etc/webc/extensions/

test: all
	cat /usr/lib/firefox/browser/defaults/preferences/webc.js
	rm -rf ~/.mozilla
	pkill firefox || true
	firefox -CreateProfile default
	firefox ./webconverger.xpi

.PHONY: clean all upload
