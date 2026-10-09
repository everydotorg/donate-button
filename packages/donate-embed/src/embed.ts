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
 * selector      CSS selector of the element the donate form is added to, or
 *               the element itself (for example inside a shadow root).
 * partnerSlug   The partner slug every.org assigned to you.
 * nonprofitSlug The every.org slug of the nonprofit to donate to.
 * onSuccess     Called when a donation completes.
 *
 * The donate form renders in an iframe that fills the width of its
 * container and resizes itself to fit its content.
 */

interface EveryWidgetOptions {
	/**
	 * CSS selector of the element the donate form is added to, or the element
	 * itself. Pass an element when the container is not reachable from
	 * `document` (for example inside a web component's shadow root).
	 */
	selector: string | Element;
	/** The partner slug every.org assigned to you. */
	partnerSlug: string;
	/** The every.org slug of the nonprofit to donate to. */
	nonprofitSlug: string;
	/** Called when a donation completes. */
	onSuccess?: () => void;
}

interface EveryWidget {
	create(options: EveryWidgetOptions): HTMLIFrameElement | null;
}

interface Window {
	everyWidget: EveryWidget;
}

(function () {
	var EMBED_ORIGIN = 'https://embed-staging.every.org';
	var MESSAGE_SOURCE = 'every-widget';

	interface ResizeMessage {
		source: typeof MESSAGE_SOURCE;
		type: 'resize';
		height: number;
	}

	interface SuccessMessage {
		source: typeof MESSAGE_SOURCE;
		type: 'success';
	}

	type EmbedMessage = ResizeMessage | SuccessMessage;

	function resolveContainer(selector: string | Element): Element | null {
		if (typeof selector === 'string') {
			// Throws a SyntaxError for a malformed selector, which is intentional.
			return document.querySelector(selector);
		}

		return selector instanceof Element ? selector : null;
	}

	function isEmbedMessage(data: unknown): data is EmbedMessage {
		return (
			typeof data === 'object' &&
			data !== null &&
			(data as {source?: unknown}).source === MESSAGE_SOURCE
		);
	}

	function create(options: EveryWidgetOptions): HTMLIFrameElement | null {
		var container = resolveContainer(options.selector);
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

		window.addEventListener('message', function (event: MessageEvent) {
			if (
				event.origin !== EMBED_ORIGIN ||
				event.source !== iframe.contentWindow
			) {
				return;
			}

			var data: unknown = event.data;
			if (!isEmbedMessage(data)) {
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
