prepare-design:
	yarn build
	cp -R .next/server/pages design-data
	node buildImports.js