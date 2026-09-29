import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import preact from '@preact/preset-vite';
import {defineConfig} from 'vite';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
	fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')
);

const [major, minor] = packageJson.version.split('.').map(Number);
const VERSION_SLUG = major === 0 ? `${major}.${minor}` : `${major}`;
const VERSION_PATH = `dist/donate-button/${VERSION_SLUG}`;
const HTML_TEMPLATE = path.join(packageDir, 'src/public/index.html');
const STATIC_ASSETS_DIR = path.join(packageDir, 'src/assets');

/**
 * The embed is loaded from third-party pages by a plain script tag, so the
 * entry is a TS module rather than an HTML page. This plugin serves and emits
 * the demo page around that entry.
 */
function demoPage(base) {
	return {
		name: 'donate-button-demo-page',
		configureServer(server) {
			server.middlewares.use((req, _res, next) => {
				if (req.url === '/' || req.url === '/index.html') {
					req.url = '/src/public/index.html';
				}
				next();
			});
		},
		transformIndexHtml: {
			order: 'pre',
			handler: (_html, ctx) =>
				ctx.server
					? [
							{
								tag: 'script',
								attrs: {type: 'module', src: '/src/index.tsx'},
								injectTo: 'head'
							}
					  ]
					: []
		},
		generateBundle() {
			const html = fs
				.readFileSync(HTML_TEMPLATE, 'utf8')
				.replace(
					'</head>',
					`<script type="text/javascript" src="${base}index.js"></script></head>`
				);
			this.emitFile({type: 'asset', fileName: 'index.html', source: html});
			// preact-cli copied src/assets verbatim; keep those URLs available.
			for (const file of fs.readdirSync(STATIC_ASSETS_DIR)) {
				this.emitFile({
					type: 'asset',
					fileName: `assets/${file}`,
					source: fs.readFileSync(path.join(STATIC_ASSETS_DIR, file))
				});
			}
		}
	};
}

export default defineConfig(({command}) => {
	const vercelBaseUrl = process.env.VERCEL_URL;
	const base =
		command === 'build'
			? vercelBaseUrl
				? `https://${vercelBaseUrl}/${VERSION_SLUG}/`
				: `https://assets.every.org/${VERSION_PATH}/`
			: '/';

	return {
		base,
		plugins: [preact(), demoPage(base)],
		resolve: {
			alias: {src: path.join(packageDir, 'src')}
		},
		build: {
			outDir: VERSION_PATH,
			sourcemap: true,
			target: 'es2015',
			// Keep icons as separate files served from `base`, as preact-cli did.
			assetsInlineLimit: 0,
			rollupOptions: {
				input: path.join(packageDir, 'src/index.tsx'),
				output: {
					format: 'iife',
					entryFileNames: 'index.js',
					// Keep the names preact-cli's file-loader gave: the MD4 digest of
					// the contents. Node only provides MD4 with --openssl-legacy-provider.
					assetFileNames: ({source}) =>
						`${crypto.createHash('md4').update(source).digest('hex')}[extname]`
				}
			}
		}
	};
});
