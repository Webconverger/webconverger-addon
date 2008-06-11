all: webcnoaddressbar webconverger

webconverger:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

webcnoaddressbar:
	cp $@.css content/wc.css
	zip -r $@.xpi chrome.manifest content install.rdf defaults

clean:
	rm -rf *.xpi content/wc.css

.PHONY: webconverger webcnoaddressbar clean all
