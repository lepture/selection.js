# Makefile for selection.js
# Author: Hsiaoming Yang <lepture@me.com>
# Website: http://lepture.com

.PHONY: doc upload publish


doc:
	doki.py -l js -t default --title=selection.js --github=selection.js README.md > index.html

upload:
	git push origin master

publish:
	git push origin gh-pages
