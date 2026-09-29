const path = require('path');

const test = require('ava');
const {createFetchMock, Miniflare} = require('miniflare');

test('built service worker uses KV and returns the fetched bundle', async (t) => {
	const fetchMock = createFetchMock();
	fetchMock.disableNetConnect();
	fetchMock
		.get('https://assets.every.org')
		.intercept({path: '/dist/donate-button/0.2/bundle.js'})
		.reply(200, 'bundle payload');

	const mf = new Miniflare({
		modules: false,
		scriptPath: path.join(__dirname, '../dist/worker.production.js'),
		kvNamespaces: ['CLIENT_DATA_KV'],
		fetchMock
	});
	try {
		const response = await mf.dispatchFetch(
			'https://assets.every.org/donate-button/newclient/bundle.js'
		);
		const kv = await mf.getKVNamespace('CLIENT_DATA_KV');

		t.is(response.status, 200);
		t.is(await response.text(), 'bundle payload');
		t.deepEqual(JSON.parse((await kv.get('newclient')) || ''), {
			bundleUrl: 'https://assets.every.org/dist/donate-button/0.2'
		});
		fetchMock.assertNoPendingInterceptors();
	} finally {
		await mf.dispose();
	}
});
