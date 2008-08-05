SRC = webcnoaddressbar webconverger webctabkiller yourlibrary

all: ${SRC}

${SRC}:
	cp $@.css content/wc.css
	cp $@.xul content/wc.xul
	cp $@.js content/wc.js
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js

.PHONY: clean all
