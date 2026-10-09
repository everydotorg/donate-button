# donate-embed

`embed.js` renders the every.org donate form inline on your page. It adds an
iframe to a container of your choice, sizes it to fit the form, and tells you
when a donation completes.

Published at **https://embeds.every.org/embed.js**.

## Usage

```html
<div id="donate-widget"></div>

<script src="https://embeds.every.org/embed.js"></script>
<script>
	everyWidget.create({
		selector: '#donate-widget',
		partnerSlug: 'your-partner-slug',
		nonprofitSlug: 'nonprofit-slug',
		onSuccess: function () {}
	});
</script>
```

Options for `everyWidget.create`:

- `selector` (required): CSS selector of the element the donate form is added
  to, or the element itself. Pass an element when the container is not
  reachable from `document`, for example inside a web component's shadow root.
  A malformed selector string throws, just like `document.querySelector`.
- `partnerSlug` (required): the partner slug every.org assigned to you.
- `nonprofitSlug` (required): the every.org slug of the nonprofit to donate to.
- `onSuccess` (optional): called when a donation completes.

`create` returns the `<iframe>` element, or `null` if the options are invalid.

Inside a web component:

```js
class DonateWidget extends HTMLElement {
	connectedCallback() {
		const root = this.attachShadow({mode: 'open'});
		const container = document.createElement('div');
		root.appendChild(container);
		everyWidget.create({
			selector: container,
			partnerSlug: 'your-partner-slug',
			nonprofitSlug: 'nonprofit-slug'
		});
	}
}
```

The form fills the width of its container and resizes itself to fit its
content, so the container's width is what sets the form's width.

The form is currently served from the every.org staging environment.

## Development

The source is `src/embed.ts`. `tsc` compiles it to a single classic ES2015 script
and [terser](https://terser.org) minifies it in place at
`dist/donate-button/embed.js`; there is no bundler.

- `yarn build` builds once; `yarn dev` recompiles on change (unminified).
- `yarn lint` type-checks with `tsc` and checks formatting with Prettier.

## Publishing

Vercel serves `embeds.every.org` as a static site from `docs/dist/donate-button/`.
From the repo root, `yarn build:donateEmbed` builds the minified script and
copies it to `docs/dist/donate-button/embed.js`. Check that file in to publish
it; the package's own `dist` folder is not checked in.
