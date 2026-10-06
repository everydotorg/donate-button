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

- `selector` (required): CSS selector of the element the donate form is added to.
- `partnerSlug` (required): the partner slug every.org assigned to you.
- `nonprofitSlug` (required): the every.org slug of the nonprofit to donate to.
- `onSuccess` (optional): called when a donation completes.

`create` returns the `<iframe>` element, or `null` if the options are invalid.

The form fills the width of its container and resizes itself to fit its
content, so the container's width is what sets the form's width.

The form is currently served from the every.org staging environment.

## Publishing

From the repo root, `yarn build:donateEmbed` copies `embed.js` to
`docs/dist/donate-button/embed.js`. Check that file in to publish it.
