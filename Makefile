SRC = webcnoaddressbar webconverger webcfullscreen

all: ${SRC}

${SRC}:
	cp src/$@.css content/wc.css
	cp src/$@.xul content/wc.xul
	cp src/$@.js content/wc.js
	sed -i 's,<em:name>.*</em:name>,<em:name>$@</em:name>,g' install.rdf
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi content/wc.css content/wc.xul content/wc.js

upload:
	rsync *.xpi webconverger.com:webconverger.com/xpis/

.PHONY: clean all
