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

// Production builds run on Vercel, which sets VERCEL_URL. The bundle runs on
// third-party pages, so its icon URLs must point back to the deployment.
const base = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}/${VERSION_SLUG}/`
	: '/';

/** Emits the demo page (embeds.every.org/0.4) with the built script. */
const demoPage = {
	name: 'donate-button-demo-page',
	generateBundle() {
		const html = fs
			.readFileSync(path.join(packageDir, 'index.html'), 'utf8')
			.replace(
				'<script type="module" src="/src/index.tsx"></script>',
				`<script src="${base}index.js"></script>`
			);
		this.emitFile({type: 'asset', fileName: 'index.html', source: html});
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
