import test from "ava";
import { fake } from "sinon";

import { LATEST_BASE_URL, handleRequest } from "src/handler";
import { NamespaceValue, namespaceValueCodec } from "src/helpers/codecs";
import { pathJoinToUrl } from "src/helpers/url";

const UNSUPPORTED_METHODS = [
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH",
];
UNSUPPORTED_METHODS.forEach((method) => {
  test(`handler returns 404 with request method ${method}`, async (t) => {
    const result = await handleRequest(
      new Request("/donate-button/someClientId.js", { method }),
      {} as KVNamespace,
      () => Promise.resolve(new Response())
    );
    t.is(result.status, 404, "Response returned 404 status");
  });
});

test("Saves and fetches CURRENT_VERSION if no client found", async (t) => {
  const mockKv = { get: fake.returns(null), put: fake() };
  const fetchReturn = new Response("yay", { status: 200 });
  const mockFetch = fake.returns(fetchReturn);

  const clientId = "nonexistentClientId";
  const result = await handleRequest(
    new Request(`/donate-button/${clientId}/bundle.js`, { method: "GET" }),
    (mockKv as unknown) as KVNamespace,
    mockFetch
  );

  t.truthy(mockKv.get.calledOnce, "Got value from KV with correct key");
  t.deepEqual(
    mockKv.get.firstCall.args,
    [clientId],
    "Got value for the correct client ID"
  );

  t.truthy(mockKv.put.calledOnce, "Called put once");
  const { args: putArgs } = mockKv.put.getCalls()[0];
  t.truthy(putArgs.length === 2, "kv put called with two args");
  t.is(putArgs[0], clientId, "Called put for proper client ID");
  t.is(
    JSON.parse(putArgs[1]).bundleUrl,
    LATEST_BASE_URL.toString(),
    "kv put called with proper bundle URL"
  );

  const expectedUrl = pathJoinToUrl(LATEST_BASE_URL, "bundle.js");
  t.truthy(mockFetch.calledOnce, "fetch called once");
  t.deepEqual(
    mockFetch.firstCall.args,
    [expectedUrl.toString()],
    "fetch called with proper url"
  );
  t.is(result, fetchReturn, "Returns whatever fetch returned");
});

test("Fetches proper version from kv if client found", async (t) => {
  const clientBundleUrl = new URL("https://google.com");
  const fakeKvValue: NamespaceValue = { bundleUrl: clientBundleUrl };
  const mockKv = {
    get: fake.returns(namespaceValueCodec.encode(fakeKvValue)),
    put: fake(),
  };
  const fetchReturn = new Response();
  const mockFetch = fake.returns(fetchReturn);

  const clientId = "someClientId";
  const result = await handleRequest(
    new Request(`/donate-button/${clientId}/bundle.js`, { method: "GET" }),
    (mockKv as unknown) as KVNamespace,
    mockFetch
  );
  t.truthy(mockKv.get.calledOnce, "Got config from KV oncewith correct key");
  t.deepEqual(
    mockKv.get.firstCall.args,
    [clientId],
    "Cot config from KV with the correct key"
  );
  t.truthy(mockKv.put.notCalled, "Did not call put");

  const expectedUrl = pathJoinToUrl(clientBundleUrl, "bundle.js");

  t.truthy(mockFetch.calledOnce, "fetch called once with client bundle URL");
  t.deepEqual(
    mockFetch.firstCall.args,
    [expectedUrl.toString()],
    "fetch called once with the proper proxied url"
  );
  t.is(result, fetchReturn, "Returns whatever fetch returned");
});
