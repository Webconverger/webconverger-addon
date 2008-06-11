SRC = ${shell ls *.css}
#all:
#	@for i in ${shell ls *.css} ; do echo $$i.xpi ; \
#	cp $$i content/wc.css \
#	zip -r $$i.xpi chrome.manifest content install.rdf defaults ; done

all: ${SRC}
	cp $< content/wc.css
	zip -r $<.xpi chrome.manifest content install.rdf defaults

clean:
	@rm -rf *.xpi

.PHONY: all clean
