SRC = webcnoaddressbar webconverger webctabkiller webcyourlibrary

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js

.PHONY: clean all
