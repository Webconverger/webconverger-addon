SRC = webcnoaddressbar webconverger webcnotabs

all: ${SRC}

${SRC}:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi content/wc.css

.PHONY: clean all
