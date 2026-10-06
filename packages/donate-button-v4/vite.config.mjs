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
const STATIC_ASSETS_DIR = path.join(packageDir, 'src/assets');

// Production builds run on Vercel, which sets VERCEL_URL. The bundle runs on
// third-party pages, so its icon URLs must point back to the deployment.
const base = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}/${VERSION_SLUG}/`
	: '/';

/** The demo page is src/public/index.html plus a script tag for the widget. */
function demoPageHtml(scriptTag) {
	return fs
		.readFileSync(path.join(packageDir, 'src/public/index.html'), 'utf8')
		.replace('</head>', `${scriptTag}</head>`);
}

/** Serves the demo page in development and emits it with the build. */
const demoPage = {
	name: 'donate-button-demo-page',
	configureServer(server) {
		server.middlewares.use(async (req, res, next) => {
			if (req.url !== '/') {
				next();
				return;
			}

			const html = demoPageHtml(
				'<script type="module" src="/src/index.tsx"></script>'
			);
			res.setHeader('Content-Type', 'text/html');
			res.end(await server.transformIndexHtml(req.url, html));
		});
	},
	generateBundle() {
		this.emitFile({
			type: 'asset',
			fileName: 'index.html',
			source: demoPageHtml(`<script src="${base}index.js"></script>`)
		});
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

export default defineConfig({
	base,
	plugins: [preact(), demoPage],
	resolve: {
		alias: {src: path.join(packageDir, 'src')}
	},
	build: {
		outDir: `dist/donate-button/${VERSION_SLUG}`,
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
});
