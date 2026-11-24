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
- `partnerSlug`: the partner slug every.org assigned to you. One of
  `partnerSlug` or `partnerId` is required.
- `partnerId`: the partner id every.org assigned to you. An alternative to
  `partnerSlug`; if both are given, `partnerId` takes precedence.
- `nonprofitSlug` (required): the every.org slug of the nonprofit to donate to.
- `onSuccess` (optional): called when a donation completes.

The form also takes the customizations of an every.org
[donate link](https://docs.every.org/docs/donate-link). All are optional:

| Option              | Donate link parameter | Description                                                                                                                                       |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`            | `amount`              | Donation amount the form starts with.                                                                                                             |
| `suggestedAmounts`  | `suggestedAmounts`    | Array of up to five suggested amounts, shown as buttons below the amount field.                                                                   |
| `frequency`         | `frequency`           | Donation frequency the form starts with: `'ONCE'` or `'MONTHLY'`.                                                                                 |
| `email`             | `email`               | Donor's email.                                                                                                                                    |
| `firstName`         | `first_name`          | Donor's first name.                                                                                                                               |
| `lastName`          | `last_name`           | Donor's last name.                                                                                                                                |
| `description`       | `description`         | Replaces the text on the nonprofit's card in the form.                                                                                            |
| `partnerDonationId` | `partner_donation_id` | A unique id of yours to associate with the donation.                                                                                              |
| `partnerMetadata`   | `partner_metadata`    | A base64 encoded JSON object that is forwarded to you in the partner webhook notification.                                                        |
| `requireShareInfo`  | `require_share_info`  | `true` requires the donor to share their contact info with the nonprofit.                                                                         |
| `shareInfo`         | `share_info`          | Whether sharing contact info is checked by default.                                                                                               |
| `designation`       | `designation`         | Designation for the donation (a recommendation to the nonprofit, not a legal restriction).                                                        |
| `webhookToken`      | `webhook_token`       | Token of your partner webhook; it is notified of every donation completed through the form.                                                       |
| `themeColor`        | `theme_color`         | Primary theme color of the form as a hex color, with or without the leading `#`: for example `'#009BF8'`.                                         |
| `method`            | `method`              | Allowed donation methods, as an array or a comma separated string: `card`, `bank`, `paypal`, `venmo`, `pay`, `crypto`, `stocks`, `daf` and `ira`. |
| `code`              | `code`                | Code of a custom donate link created by the nonprofit; the form uses that link's settings. Options given here override them.                      |

```js
everyWidget.create({
	selector: '#donate-widget',
	partnerSlug: 'your-partner-slug',
	nonprofitSlug: 'nonprofit-slug',
	amount: 25,
	suggestedAmounts: [10, 25, 50, 100],
	frequency: 'MONTHLY',
	method: ['card', 'bank', 'paypal'],
	themeColor: '#009BF8'
});
```

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
