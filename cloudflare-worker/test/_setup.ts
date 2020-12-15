// set up global namespace for worker environment
import makeServiceWorkerEnv = require("service-worker-mock");
declare const global: WorkerGlobalScope;
Object.assign(global, makeServiceWorkerEnv());
