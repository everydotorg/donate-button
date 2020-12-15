import { handleRequest } from "./handler";

declare global {
  // keys are client ids, values are of type described by namespaceValueCodec
  const DONATE_BUTTON_ASSETS: KVNamespace;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request, DONATE_BUTTON_ASSETS, fetch));
});
