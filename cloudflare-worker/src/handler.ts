import {isLeft as couldNotDecode} from 'fp-ts/Either';
import {pathToRegexp} from 'path-to-regexp';

import {namespaceValueCodec} from 'src/helpers/codecs';
import {pathJoinToUrl} from 'src/helpers/url';

const CURRENT_MAJOR_VERSION = 2;
const AVAILABLE_MAJOR_VERSIONS = new Set([2]);

if (!AVAILABLE_MAJOR_VERSIONS.has(CURRENT_MAJOR_VERSION)) {
	throw new Error(
		"Available major versions doesn't include the current version"
	);
}

const ASSETS_HOST = new URL('https://assets.every.org');

function assetBaseUrlByVersion(majorVersion: number, assetsHost: URL) {
	return pathJoinToUrl(assetsHost, `donate-button-v${majorVersion}`);
}

function assetPathByVersion(
	majorVersion: number,
	assetsHost: URL,
	...pathRest: string[]
) {
	return pathJoinToUrl(
		assetBaseUrlByVersion(majorVersion, assetsHost),
		...pathRest
	);
}

export const LATEST_BASE_URL = assetPathByVersion(
	CURRENT_MAJOR_VERSION,
	ASSETS_HOST
);

/**
 * In this scheme, GET requests are expected to come to
 * `https://assets.every.org/donate-button/:clientId/...`, where we keep track
 * of the root of the bundle to serve for a given client ID in order to provide
 * different versions for different clients
 *
 * When we make breaking changes, we bump the latest version (and new clients
 * will get it since we default to the current version)
 */
const customClientBundlePathRegexp = pathToRegexp(
	'/donate-button/:clientId([a-z0-9]+)/:pathRest*'
);

type Fetch = typeof fetch;

declare const global: WorkerGlobalScope;

export const VERSION_SEARCH_PARAM = 'v';
/**
 * Returns the major bundle version to serve to the client based on the version
 * string provided
 */
function determineBundleVersion({
	searchParams,
	availableMajorVersions,
	currentMajorVersion
}: {
	searchParams: URLSearchParams;
	availableMajorVersions: Set<number>;
	currentMajorVersion: number;
}): number {
	const searchVersion = searchParams.get(VERSION_SEARCH_PARAM);
	if (!searchVersion) {
		return currentMajorVersion;
	}

	const specifiedVersion = Number(searchVersion);
	if (!availableMajorVersions.has(specifiedVersion)) {
		return currentMajorVersion;
	}

	return specifiedVersion;
}

async function determineUrlToProxy(parameters: {
	request: Request;
	kvNamespace: KVNamespace;
	availableMajorVersions: Set<number>;
	currentMajorVersion: number;
	assetsHost: URL;
}): Promise<URL | null> {
	const {
		request,
		kvNamespace,
		availableMajorVersions,
		currentMajorVersion,
		assetsHost
	} = parameters;
	const requestUrl = new URL(request.url);
	if (requestUrl.pathname === '/donate-button.js') {
		return assetPathByVersion(
			determineBundleVersion({
				searchParams: requestUrl.searchParams,
				availableMajorVersions,
				currentMajorVersion
			}),
			assetsHost,
			requestUrl.pathname
		);
	}

	const match = customClientBundlePathRegexp.exec(requestUrl.pathname);
	if (!match) {
		return null;
	}

	const [_, clientId, pathRest] = match;
	const clientValueRaw = await kvNamespace.get(clientId);
	const clientValue =
		clientValueRaw && namespaceValueCodec.decode(clientValueRaw);

	const baseUrlToProxy = clientValue
		? couldNotDecode(clientValue)
			? LATEST_BASE_URL
			: clientValue.right.bundleUrl
		: LATEST_BASE_URL;

	const urlToProxy = pathJoinToUrl(baseUrlToProxy, pathRest);

	if (!clientValue) {
		await kvNamespace.put(
			clientId,
			namespaceValueCodec.encode({bundleUrl: baseUrlToProxy})
		);
	} else if (couldNotDecode(clientValue)) {
		console.log(
			'Client value was invalid, defaulting to current version but not overwriting previous value'
		);
	}

	return urlToProxy;
}

/**
 * @param request Input request to be routed; only responds if in the expected
 * URL format; @see customClientBundlePathRegexp
 * @param kvNamespace KV namespace containing client data
 * @param options mostly overridable values from defaults for ease of testing
 * @returns A response to send back to the client, proxying to the appropriate
 * JavaScript bundle for the given client ID
 */
export async function handleRequest(
	request: Request,
	kvNamespace: KVNamespace,
	options: {
		fetch?: Fetch;
		availableMajorVersions?: Set<number>;
		currentMajorVersion?: number;
		assetsHost?: URL;
	}
): Promise<Response> {
	const {
		fetch = global.fetch,
		availableMajorVersions = AVAILABLE_MAJOR_VERSIONS,
		currentMajorVersion = CURRENT_MAJOR_VERSION,
		assetsHost = ASSETS_HOST
	} = options;
	const resp404 = new Response('Not found', {status: 404});
	if (request.method !== 'GET') {
		return resp404;
	}

	const urlToProxy = await determineUrlToProxy({
		request,
		kvNamespace,
		availableMajorVersions,
		currentMajorVersion,
		assetsHost
	});
	if (!urlToProxy) {
		return resp404;
	}

	return fetch(urlToProxy.toString());
}
