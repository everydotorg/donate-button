import test from 'ava';
import {fake} from 'sinon';

import {
	LATEST_BASE_URL,
	handleRequest,
	VERSION_SEARCH_PARAM
} from 'src/handler';
import {NamespaceValue, namespaceValueCodec} from 'src/helpers/codecs';
import {pathJoinToUrl} from 'src/helpers/url';

const UNSUPPORTED_METHODS = [
	'HEAD',
	'POST',
	'PUT',
	'DELETE',
	'CONNECT',
	'OPTIONS',
	'TRACE',
	'PATCH'
];
UNSUPPORTED_METHODS.forEach((method) => {
	test(`handler returns 404 with request method ${method}`, async (t) => {
		const result = await handleRequest(
			new Request('/donate-button/someClientId.js', {method}),
			{} as KVNamespace,
			{fetch: async () => Promise.resolve(new Response())}
		);
		t.is(result.status, 404, 'Response returned 404 status');
	});
});

const VERSION_SPEC_TEST_CASES: Array<{
	name: string;
	versionParam: string | null;
	availableMajorVersions: number[];
	currentMajorVersion: number;
	expectedVersion: number;
}> = [
	{
		name: 'returns latest version if not specified',
		versionParam: null,
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 3
	},
	{
		name: 'returns latest version if not present version',
		versionParam: '4',
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 3
	},
	{
		name: 'returns latest version if version not valid number',
		versionParam: 'as3df',
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 3
	},
	{
		name: 'returns latest version if version is NaN',
		versionParam: 'NaN',
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 3
	},
	{
		name: 'returns latest version if version is fractional',
		versionParam: '2.5',
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 3
	},
	{
		name: 'returns specified version if valid',
		versionParam: '2',
		availableMajorVersions: [2, 3],
		currentMajorVersion: 3,
		expectedVersion: 2
	}
];
for (const {
	name,
	versionParam,
	currentMajorVersion,
	availableMajorVersions,
	expectedVersion
} of VERSION_SPEC_TEST_CASES) {
	test(`When fetching donate-button.js, ${name}`, async (t) => {
		const mockFetch = fake();
		const url = `/donate-button.js${
			versionParam
				? `?${new URLSearchParams({
						[VERSION_SEARCH_PARAM]: versionParam
				  }).toString()}`
				: ''
		}`;

		await handleRequest(new Request(url, {method: 'GET'}), {} as KVNamespace, {
			fetch: mockFetch,
			availableMajorVersions: new Set(availableMajorVersions),
			currentMajorVersion,
			assetsHost: new URL('https://test-assets.every.org')
		});

		t.true(mockFetch.calledOnce, 'Called fetch');
		t.deepEqual(
			mockFetch.firstCall.args,
			[
				`https://test-assets.every.org/donate-button-v${expectedVersion}/donate-button.js`
			],
			'fetched latest donate button bundle code'
		);
	});
}

test('Saves and fetches latest version if no client found', async (t) => {
	const mockKv = {get: fake.returns(null), put: fake()};
	const fetchReturn = new Response('yay', {status: 200});
	const mockFetch = fake.returns(fetchReturn);

	const clientId = 'nonexistentClientId';
	const result = await handleRequest(
		new Request(`/donate-button/${clientId}/bundle.js`, {method: 'GET'}),
		(mockKv as unknown) as KVNamespace,
		{fetch: mockFetch}
	);

	t.true(mockKv.get.calledOnce, 'Got value from KV with correct key');
	t.deepEqual(
		mockKv.get.firstCall.args,
		[clientId],
		'Got value for the correct client ID'
	);

	t.true(mockKv.put.calledOnce, 'Called put once');
	const {args: putArgs} = mockKv.put.getCalls()[0];
	t.true(putArgs.length === 2, 'kv put called with two args');
	t.is(putArgs[0], clientId, 'Called put for proper client ID');
	t.is(
		JSON.parse(putArgs[1]).bundleUrl,
		LATEST_BASE_URL.toString(),
		'kv put called with proper bundle URL'
	);

	const expectedUrl = pathJoinToUrl(LATEST_BASE_URL, 'bundle.js');
	t.true(mockFetch.calledOnce, 'fetch called once');
	t.deepEqual(
		mockFetch.firstCall.args,
		[expectedUrl.toString()],
		'fetch called with proper url'
	);
	t.is(result, fetchReturn, 'Returns whatever fetch returned');
});

test('Fetches proper version from kv if client found', async (t) => {
	const clientBundleUrl = new URL('https://google.com');
	const fakeKvValue: NamespaceValue = {bundleUrl: clientBundleUrl};
	const mockKv = {
		get: fake.returns(namespaceValueCodec.encode(fakeKvValue)),
		put: fake()
	};
	const fetchReturn = new Response();
	const mockFetch = fake.returns(fetchReturn);

	const clientId = 'someClientId';
	const result = await handleRequest(
		new Request(`/donate-button/${clientId}/bundle.js`, {method: 'GET'}),
		(mockKv as unknown) as KVNamespace,
		{fetch: mockFetch}
	);
	t.true(mockKv.get.calledOnce, 'Got config from KV oncewith correct key');
	t.deepEqual(
		mockKv.get.firstCall.args,
		[clientId],
		'Cot config from KV with the correct key'
	);
	t.true(mockKv.put.notCalled, 'Did not call put');

	const expectedUrl = pathJoinToUrl(clientBundleUrl, 'bundle.js');

	t.true(mockFetch.calledOnce, 'fetch called once with client bundle URL');
	t.deepEqual(
		mockFetch.firstCall.args,
		[expectedUrl.toString()],
		'fetch called once with the proper proxied url'
	);
	t.is(result, fetchReturn, 'Returns whatever fetch returned');
});
