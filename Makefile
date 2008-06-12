SRC = webcnoaddressbar webconverger

all: ${SRC}

${SRC}:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf webcnoaddressbar.xpi webconverger.xpi content/wc.css

.PHONY: clean all
