// Setup mocks for the service worker environment
import makeServiceWorkerEnv = require('service-worker-mock');
declare const global: WorkerGlobalScope;
// Node 21+ defines getter-only globals such as `navigator`, which
// Object.assign cannot overwrite.
for (const [key, value] of Object.entries(makeServiceWorkerEnv())) {
	Object.defineProperty(global, key, {
		value,
		enumerable: true,
		writable: true,
		configurable: true
	});
}
