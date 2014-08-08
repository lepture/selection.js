NAME=selection.js

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

standalone:
	@echo "(function(root) {" > ${NAME}
	@cat index.js >> ${NAME}
	@echo "\nroot.Selection = Selection;\n" >> ${NAME}
	@echo "})(this);" >> ${NAME}
	@sed -i.bak "s/module.exports/\/\//g" ${NAME}
	@rm ${NAME}.bak

.PHONY: clean
