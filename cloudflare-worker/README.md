# Donate Button Cloudflare Worker

Handles requests to `https://assets.every.org/donate-button/*`, to decide what
version of the bundle to serve to library users.

Based on `workers-typescript-template`, and depoyed with Cloudflare Worker's
build tool, [Wrangler](https://github.com/cloudflare/wrangler).

### What it does

We serve the actual built JavaScript bundles from urls like the following:
`https://assets.every.org/donate-button-v2` (replace `v2` with whatever major
version you wish to use), via Github Pages. This worker just lets requests to
URLs like that to pass through freely.

We then serve the donate-button entrypoint without the need to specify the
version from `https://assets.every.org/donate-button.js`. If you include that
script as is, it will run the entrypoint for the latest version of the donate
button library.

It supports an optional search parameter to specify a major version, like so:
`https://assets.every.org/donate-button.js?v=2`. That URL would pin the donate
button version to major version 2. However, version-pinning is not on by
default.

#### Client-specific config

If a request goes to a url matching
`https://assets.every.org/donate-button/:slug/*`, then we can provide
configuration specific to the provided slug (no relation with Every.org
nonprofit slugs). If that slug has never been accessed before, it will proxy
the latest version and associate the slug with that version in Cloudflare KV.
Therefore, any future requests to any url under `/donate-button/:slug`, will
always resolve to the same version of the bundle, but we reserve the ability
to update individual clients on their behalf. In the future, this can serve as a
basis for providing more client-specific config besides the version.

### 👩 💻 Developing

The entry point for this Cloudflare Worker is
[`src/index.ts`](./src/index.ts), and is written in TypeScript. We recommend
developing with VSCode - it is configured to work well out of the box, and
will suggest you useful extensions to aid in your development.

Feel free to make pull requests that update how this code works.

### 🧪 Testing

Run `yarn test` to run the test suite. It mocks the service-worker context that
Cloudflare emulates to allow testing locally.

### ✏️ Linting

This project uses [`xo`](https://github.com/xojs/xo) to lint and format the
project.

```
yarn lint      # lint
yarn lint:fix  # auto-format
```

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the
[Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

To publish, you will need edit access to Cloudflare; please ask a maintainer for
permission.

## ⚠️ Caveats

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.
