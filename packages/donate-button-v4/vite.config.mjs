import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import preact from '@preact/preset-vite';
import semver from 'semver';
import {defineConfig} from 'vite';

import packageJson from './package.json' with {type: 'json'};

const packageDir = path.dirname(fileURLToPath(import.meta.url));

const VERSION = semver.parse(packageJson.version);
const VERSION_SLUG =
	VERSION.major === 0 ? `${VERSION.major}.${VERSION.minor}` : VERSION.major;

export default defineConfig({
	// Production builds run on Vercel, which sets VERCEL_URL. The bundle runs on
	// third-party pages, so its icon URLs must point back to the deployment.
	base: process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}/${VERSION_SLUG}/`
		: '/',
	plugins: [preact()],
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
			// The demo page (embeds.every.org/0.4); Vite swaps its /src/index.tsx
			// script for the built index.js.
			input: path.join(packageDir, 'index.html'),
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
