SRC := webcnoaddressbar webconverger webcfullscreen

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	@mkdir -p extensions
	rsync -art chrome.manifest content install.rdf defaults components extensions/$@
clean:
	rm -rf content/wc.css content/wc.xul content/wc.js
	rm -rf extensions

deploy:
	rsync -art extensions/ /home/hendry/debian/sid-root/root/webconverger/chroot/etc/webc/extensions

.PHONY: clean all upload
