SRC := webcnoaddressbar webconverger webcfullscreen

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	@mkdir -p extensions
	rsync -art chrome.manifest content install.rdf defaults components extensions/$@
	zip -r $@.xpi chrome.manifest content install.rdf defaults components

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js
	rm -rf extensions

upload:
	rsync *.xpi webconverger.com:webconverger.com/xpis/

.PHONY: clean all upload
