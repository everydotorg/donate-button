const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

test('preview serves the local widget without changing deployed demo URLs', async (t) => {
	const {preview} = await import('vite');
	const {default: config} = await import('../vite.config.mjs');
	const previousVercelUrl = process.env.VERCEL_URL;
	t.after(() => {
		if (previousVercelUrl === undefined) delete process.env.VERCEL_URL;
		else process.env.VERCEL_URL = previousVercelUrl;
	});
	for (const vercelUrl of [null, 'preview.every.org.test']) {
		await t.test(vercelUrl ?? 'without VERCEL_URL', async (t) => {
			if (vercelUrl) process.env.VERCEL_URL = vercelUrl;
			else delete process.env.VERCEL_URL;
			const buildConfig = config({command: 'build'});
			const expectedBase = vercelUrl
				? `https://${vercelUrl}/0.4/`
				: 'https://assets.every.org/dist/donate-button/0.4/';
			assert.equal(buildConfig.base, expectedBase);
			const emitted = [];
			buildConfig.plugins
				.find((p) => p.name === 'donate-button-demo-page')
				.generateBundle.call({emitFile: (asset) => emitted.push(asset)});
			const builtHtml = emitted.find((a) => a.fileName === 'index.html').source;
			assert.ok(builtHtml.includes(`src="${expectedBase}index.js"`));
			const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'donate-preview-'));
			t.after(() => fs.rmSync(outDir, {recursive: true, force: true}));
			const localBundle = 'window.localPreviewBundle = true;';
			fs.writeFileSync(path.join(outDir, 'index.html'), builtHtml);
			fs.writeFileSync(path.join(outDir, 'index.js'), localBundle);
			const server = await preview({
				build: {outDir},
				preview: {host: '127.0.0.1', port: 0, open: false},
				logLevel: 'silent'
			});
			try {
				const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
				for (const page of [
					'/',
					'/index.html',
					'/0.4',
					'/0.4/',
					'/0.4/index.html',
					'/0.4?explicit=1'
				]) {
					await t.test(page, async () => {
						const response = await fetch(origin + page);
						assert.equal(response.status, 200);
						assert.match(response.headers.get('content-type'), /text\/html/);
						const html = await response.text();
						const src = html.match(
							/<script type="text\/javascript" src="([^"]+)"/
						)[1];
						const scriptUrl = new URL(src, origin + page);
						assert.equal(scriptUrl.origin, origin);
						const scriptResponse = await fetch(scriptUrl);
						assert.match(
							scriptResponse.headers.get('content-type'),
							/javascript/
						);
						assert.equal(await scriptResponse.text(), localBundle);
					});
				}
				assert.equal(
					fs.readFileSync(path.join(outDir, 'index.html'), 'utf8'),
					builtHtml
				);
			} finally {
				await new Promise((resolve, reject) =>
					server.httpServer.close((error) =>
						error ? reject(error) : resolve()
					)
				);
			}
		});
	}
});
