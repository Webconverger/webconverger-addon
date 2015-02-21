SRC := webcnoaddressbar webconverger webcfullscreen neon

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

deploy:
	sudo rsync --delete -art extensions/* /home/hendry/debian/sid-root/root/webconverger/chroot/etc/webc/extensions/

test: all
	rm -rf ~/.mozilla
	firefox -CreateProfile default
	firefox ./webcnoaddressbar.xpi

.PHONY: clean all upload
