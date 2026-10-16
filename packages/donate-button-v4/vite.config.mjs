import crypto from 'node:crypto';
import {createRequire} from 'node:module';

import preact from '@preact/preset-vite';
import semver from 'semver';
import {defineConfig} from 'vite';

const packageJson = createRequire(import.meta.url)('./package.json');

const VERSION = semver.parse(packageJson.version);
const VERSION_SLUG =
	VERSION.major === 0 ? `${VERSION.major}.${VERSION.minor}` : VERSION.major;

/**
 * The bundle runs on third-party pages, so built icon URLs must be absolute.
 * Vercel sets VERCEL_URL; other builds are checked into docs/ and served by
 * assets.every.org.
 * @see ../../README.md#demo-site-hosting-details
 */
function getBase(command) {
	if (command !== 'build') return '/';
	return process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}/${VERSION_SLUG}/`
		: `https://assets.every.org/dist/donate-button/${VERSION_SLUG}/`;
}

export default defineConfig(({command}) => ({
	base: getBase(command),
	plugins: [preact()],
	resolve: {
		tsconfigPaths: true
	},
	build: {
		outDir: `dist/donate-button/${VERSION_SLUG}`,
		sourcemap: true,
		target: 'es2015',
		// Keep icons as separate files served from `base`, as preact-cli did.
		assetsInlineLimit: 0,
		rolldownOptions: {
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
}));
