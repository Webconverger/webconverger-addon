all: noaddressbar webconverger

webconverger:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

noaddressbar:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi

.PHONY: webconverger noaddressbar clean all
