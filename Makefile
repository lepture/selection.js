# Makefile for selection.js
# Author: Hsiaoming Yang <lepture@me.com>
# Website: http://lepture.com

.PHONY: doc upload publish


doc:
	doki.py -l js -t default --title=selection.js --github=selection.js README.md > index.html

publish:
	git push origin gh-pages

minify:
	uglifyjs -nc selection.js > dist/selection.min.js
