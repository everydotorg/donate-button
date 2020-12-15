import { pathToRegexp } from "path-to-regexp";
import { isLeft as couldNotDecode } from "fp-ts/Either";

import { namespaceValueCodec } from "./helpers/codecs";
import { pathJoinToUrl } from "./helpers/url";

/**
 * Base URL of the most recent bundle's root; used as a default for clients that
 * do not yet have an assigned version for their bundle
 */
export const LATEST_BASE_URL = new URL("https://assets.every.org/every-month");

/**
 * GET requests are expected to come to
 * `https://assets.every.org/donate-button/:clientId/...`, where we keep track
 * of the root of the bundle to serve for a given client ID in order to provide
 * different versions for different clients
 *
 * When we make breaking changes, we bump the latest version (and new clients
 * will get it since we default to the current version;
 * @see LATEST_BASE_URL ), but existing clients can remain on the older
 * version
 */
const bundlePathRegexp = pathToRegexp(
  "/donate-button/:clientId([a-z0-9]+)/:pathRest*"
);
type Fetch = typeof fetch;

declare const global: WorkerGlobalScope;
/**
 * @param request Input request to be routed; only responds if in the expected
 * URL format; @see bundlePathRegexp
 * @param kvNamespace KV namespace containing client data
 * @param fetch fetch function; exposed to allow for simpler mocking of fetch
 * during tests
 * @returns A response to send back to the client, proxying to the appropriate
 * JavaScript bundle for the given client ID
 */
export async function handleRequest(
  request: Request,
  kvNamespace: KVNamespace,
  fetch: Fetch = global.fetch
): Promise<Response> {
  const resp404 = new Response("Not found", { status: 404 });
  if (request.method !== "GET") {
    return resp404;
  }
  const requestUrl = new URL(request.url);
  const match = bundlePathRegexp.exec(requestUrl.pathname);
  if (!match) {
    return resp404;
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

  // construct final URL to proxy to
  const searchParams = new URLSearchParams([
    ...baseUrlToProxy.searchParams.entries(),
    ...requestUrl.searchParams.entries(),
  ]);
  const hash = requestUrl.hash || baseUrlToProxy.hash;
  const urlToProxy = pathJoinToUrl(baseUrlToProxy, pathRest);
  urlToProxy.search = searchParams.toString();
  urlToProxy.hash = hash;

  if (!clientValue) {
    kvNamespace.put(
      clientId,
      namespaceValueCodec.encode({ bundleUrl: baseUrlToProxy })
    );
  } else if (couldNotDecode(clientValue)) {
    console.log(
      "Client value was invalid, defaulting to current version but not overwriting previous value"
    );
  }

  return fetch(urlToProxy.toString());
}
