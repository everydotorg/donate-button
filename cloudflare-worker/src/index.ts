import { handleRequest } from "./handler";

declare global {
  // keys are client ids, values are of type described by namespaceValueCodec
  const CLIENT_DATA_KV: KVNamespace;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request, CLIENT_DATA_KV, fetch));
});
