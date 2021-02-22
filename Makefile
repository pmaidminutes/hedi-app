prepare-design:
	rm ./design/imports.ts 
	cp ./design/__empty.ts ./design/imports.ts
	yarn build 
	cp -R .next/server/pages/ design/data