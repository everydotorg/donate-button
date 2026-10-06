/**
 * every.org embedded donate form.
 *
 * Include this script and call:
 *
 *   everyWidget.create({
 *     selector: '#donate-widget',
 *     partnerSlug: 'your-partner-slug',
 *     nonprofitSlug: 'nonprofit-slug',
 *     onSuccess: function () {},   // optional
 *   });
 *
 * selector      CSS selector of the element the donate form is added to.
 * partnerSlug   The partner slug every.org assigned to you.
 * nonprofitSlug The every.org slug of the nonprofit to donate to.
 * onSuccess     Called when a donation completes.
 *
 * The donate form renders in an iframe that fills the width of its
 * container and resizes itself to fit its content.
 */
(function () {
	var EMBED_ORIGIN = 'https://embed-staging.every.org';

	function create(options) {
		var container = document.querySelector(options.selector);
		if (!container) {
			console.error('everyWidget: no element matches', options.selector);
			return null;
		}
		if (!options.partnerSlug || !options.nonprofitSlug) {
			console.error(
				'everyWidget: partnerSlug and nonprofitSlug are required',
				options
			);
			return null;
		}

		var iframe = document.createElement('iframe');
		iframe.src =
			EMBED_ORIGIN +
			'/embed/' +
			encodeURIComponent(options.nonprofitSlug) +
			'/donate?partnerSlug=' +
			encodeURIComponent(options.partnerSlug);
		iframe.title = 'Donate';
		// The form resizes itself to fit its content, so it never scrolls.
		iframe.setAttribute('scrolling', 'no');
		// Required for Apple Pay / Google Pay.
		iframe.setAttribute('allow', 'payment');
		iframe.style.display = 'block';
		iframe.style.width = '100%';
		iframe.style.border = '0';
		iframe.style.overflow = 'hidden';
		// Placeholder height until the form reports its own.
		iframe.style.minHeight = '480px';
		container.appendChild(iframe);

		window.addEventListener('message', function (event) {
			if (
				event.origin !== EMBED_ORIGIN ||
				event.source !== iframe.contentWindow
			) {
				return;
			}

			var data = event.data || {};
			if (data.source !== 'every-widget') {
				return;
			}

			if (data.type === 'resize' && typeof data.height === 'number') {
				iframe.style.minHeight = '0';
				iframe.style.height = data.height + 'px';
			}

			if (data.type === 'success' && typeof options.onSuccess === 'function') {
				options.onSuccess();
			}
		});

		return iframe;
	}

	window.everyWidget = {create: create};
})();
