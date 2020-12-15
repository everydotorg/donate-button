import { CURRENT_VERSION_URL, handleRequest } from "../src/handler";
import { NamespaceValue, namespaceValueCodec } from "../src/helpers/codecs";
import test, { beforeEach } from "ava";
import { expectation, fake } from "sinon";

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

declare const global: WorkerGlobalScope;
test("Saves and fetches CURRENT_VERSION if no client found", async (t) => {
  const mockKv = { get: fake.returns(null), put: fake() };
  const fetchReturn = new Response("yay", { status: 200 });
  const mockFetch = fake.returns(fetchReturn);

  const clientId = "nonexistentClientId";
  const result = await handleRequest(
    new Request(`/donate-button/${clientId}.js`, { method: "GET" }),
    (mockKv as unknown) as KVNamespace,
    mockFetch
  );

  t.truthy(
    mockKv.get.calledOnceWithExactly(clientId),
    "Called KV with correct key"
  );

  t.truthy(mockKv.put.calledOnce, "Called put once");
  const { args: putArgs } = mockKv.put.getCalls()[0];
  t.truthy(putArgs.length === 2, "kv put called with two args");
  t.is(putArgs[0], clientId, "Called put for proper client ID");
  t.is(
    JSON.parse(putArgs[1]).bundleUrl,
    CURRENT_VERSION_URL.toString(),
    "kv put called with proper bundle URL"
  );

  t.truthy(
    mockFetch.calledOnceWithExactly(CURRENT_VERSION_URL.toString()),
    "fetch called once with CURRENT_VERSION_URL"
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
    new Request(`/donate-button/${clientId}.js`, { method: "GET" }),
    (mockKv as unknown) as KVNamespace,
    mockFetch
  );
  t.truthy(
    mockKv.get.calledOnceWithExactly(clientId),
    "Called KV with correct key"
  );
  t.truthy(mockKv.put.notCalled, "Did not call put");

  t.truthy(
    mockFetch.calledOnceWithExactly(clientBundleUrl.toString()),
    "fetch called once with client bundle URL"
  );
  t.is(result, fetchReturn, "Returns whatever fetch returned");
});
