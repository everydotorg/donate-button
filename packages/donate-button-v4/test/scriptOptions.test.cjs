const assert = require('node:assert/strict');
const test = require('node:test');

require('ts-node').register({
	transpileOnly: true,
	compilerOptions: {module: 'commonjs'}
});
require('tsconfig-paths/register');

const {shouldEnableAutoPlay} = require('../src/helpers/shouldEnableAutoPlay');
const {
	shouldEnableFormOnlyMode
} = require('../src/helpers/shouldEnableFormOnlyMode');
const {
	default: shouldApplyEveryStyleForAllLinks
} = require('../src/helpers/shouldApplyEveryStyleForAllLinks');

function script(attributes = {}) {
	return {getAttribute: (name) => attributes[name] ?? null};
}

function setup(
	t,
	{currentScript = null, devScript = null, production = false} = {}
) {
	const previousDocument = global.document;
	const previousNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = production ? 'production' : 'development';
	global.document = {
		currentScript,
		querySelector(selector) {
			assert.equal(selector, 'script[data-every-dev-script]');
			return devScript;
		}
	};
	t.after(() => {
		if (previousDocument === undefined) delete global.document;
		else global.document = previousDocument;
		if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
		else process.env.NODE_ENV = previousNodeEnv;
	});
}

test('dev module honors explicit=1', (t) => {
	setup(t, {devScript: script({src: '/src/index.tsx?explicit=1'})});
	assert.equal(shouldEnableAutoPlay(), false);
});

test('dev module honors formOnly=1', (t) => {
	setup(t, {devScript: script({src: '/src/index.tsx?formOnly=1'})});
	assert.equal(shouldEnableFormOnlyMode(), true);
});

test('dev module honors an empty data-every-style attribute', (t) => {
	setup(t, {devScript: script({'data-every-style': ''})});
	assert.equal(shouldApplyEveryStyleForAllLinks(), true);
});

test('classic script takes precedence over the dev script', (t) => {
	setup(t, {
		currentScript: script({src: '/index.js?explicit=1'}),
		devScript: script({
			src: '/src/index.tsx?formOnly=1',
			'data-every-style': ''
		})
	});
	assert.equal(shouldEnableAutoPlay(), false);
	assert.equal(shouldEnableFormOnlyMode(), false);
	assert.equal(shouldApplyEveryStyleForAllLinks(), false);
});

test('production classic embed honors all script options', (t) => {
	setup(t, {
		production: true,
		currentScript: script({
			src: '/index.js?explicit=1&formOnly=1',
			'data-every-style': ''
		})
	});
	assert.equal(shouldEnableAutoPlay(), false);
	assert.equal(shouldEnableFormOnlyMode(), true);
	assert.equal(shouldApplyEveryStyleForAllLinks(), true);
});

test('production ignores a marked script when currentScript is null', (t) => {
	setup(t, {
		production: true,
		devScript: script({
			src: '/src/index.tsx?explicit=1&formOnly=1',
			'data-every-style': ''
		})
	});
	assert.equal(shouldEnableAutoPlay(), true);
	assert.equal(shouldEnableFormOnlyMode(), false);
	assert.equal(shouldApplyEveryStyleForAllLinks(), false);
});

test('missing dev script preserves default options', (t) => {
	setup(t);
	assert.equal(shouldEnableAutoPlay(), true);
	assert.equal(shouldEnableFormOnlyMode(), false);
	assert.equal(shouldApplyEveryStyleForAllLinks(), false);
});

test('Vite marks the dev entry and replaces the development environment check', async () => {
	const fs = require('node:fs');
	const {createServer} = await import('vite');
	const server = await createServer({
		server: {middlewareMode: true, hmr: false},
		optimizeDeps: {noDiscovery: true, include: []}
	});
	try {
		const html = await server.transformIndexHtml(
			'/',
			fs.readFileSync('src/public/index.html', 'utf8')
		);
		assert.match(
			html,
			/<script type="module" data-every-dev-script src="\/src\/index.tsx">/
		);
		const transformed = await server.transformRequest(
			'/src/helpers/getCurrentScript.ts'
		);
		assert.ok(transformed);
		assert.match(transformed.code, /"development" === "development"/);
		assert.doesNotMatch(transformed.code, /process\.env\.NODE_ENV/);
	} finally {
		await server.close();
	}
});
