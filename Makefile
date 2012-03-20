SRC := webcnoaddressbar webconverger webcfullscreen
CHROOT := hetty:Debian-Live-config/webconverger/git-chroot/etc/webc/iceweasel/extensions

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	zip -r $@.xpi chrome.manifest content install.rdf defaults components
	rsync -art chrome.manifest content install.rdf defaults components $(CHROOT)/$@

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js

upload:
	rsync *.xpi webconverger.com:webconverger.com/xpis/

.PHONY: clean all upload
