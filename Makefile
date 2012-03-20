SRC := webcnoaddressbar webconverger webcfullscreen

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	zip -r $@.xpi chrome.manifest content install.rdf defaults components
	@mkdir -p extensions
	rsync -art chrome.manifest content install.rdf defaults components extensions/$@

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js
	rm -rf extensions

upload:
	rsync *.xpi webconverger.com:webconverger.com/xpis/

hetty:
	rsync -art --delete extensions hetty:extensions/

.PHONY: clean all upload
