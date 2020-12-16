// setup mocks for the service worker environment
// TODO: find an alternative to this since it seems like it's no longer being
// maintained
import makeServiceWorkerEnv = require("service-worker-mock");
declare const global: WorkerGlobalScope;
Object.assign(global, makeServiceWorkerEnv());
