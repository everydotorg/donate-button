import { pathToRegexp } from "path-to-regexp";
import { namespaceValueCodec } from "./helpers/codecs";
import { isLeft as couldNotDecode } from "fp-ts/Either";

export const CURRENT_VERSION_URL = new URL(
  "https://assets.every.org/donate-button-v2.js"
);

const bundlePathRegexp = pathToRegexp("/donate-button/:clientId([a-z0-9]+).js");
type Fetch = typeof fetch;

export async function handleRequest(
  request: Request,
  kvNamespace: KVNamespace,
  fetch: Fetch
): Promise<Response> {
  const resp404 = new Response("Not found", { status: 404 });
  if (request.method !== "GET") {
    return resp404;
  }
  const match = bundlePathRegexp.exec(new URL(request.url).pathname);
  if (!match) {
    return resp404;
  }
  const clientId = match[1];
  const clientValueRaw = await kvNamespace.get(clientId);
  const clientValue =
    clientValueRaw && namespaceValueCodec.decode(clientValueRaw);
  const urlToProxy = clientValue
    ? couldNotDecode(clientValue)
      ? CURRENT_VERSION_URL
      : clientValue.right.bundleUrl
    : CURRENT_VERSION_URL;

  if (!clientValue) {
    kvNamespace.put(
      clientId,
      namespaceValueCodec.encode({ bundleUrl: urlToProxy })
    );
  } else if (couldNotDecode(clientValue)) {
    console.log(
      "Client value was invalid, defaulting to current version but not overwriting previous value"
    );
  }

  return fetch(urlToProxy.toString());
}
