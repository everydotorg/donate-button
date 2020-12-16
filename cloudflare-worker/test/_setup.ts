// Setup mocks for the service worker environment
import makeServiceWorkerEnv = require('service-worker-mock');
declare const global: WorkerGlobalScope;
Object.assign(global, makeServiceWorkerEnv());
