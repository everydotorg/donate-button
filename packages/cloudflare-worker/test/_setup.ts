// Setup mocks for the service worker environment
import makeServiceWorkerEnv = require('service-worker-mock');
declare const global: WorkerGlobalScope;
// Node 21+ defines a getter-only `navigator` that Object.assign cannot overwrite.
Reflect.deleteProperty(global, 'navigator');
Object.assign(global, makeServiceWorkerEnv());
