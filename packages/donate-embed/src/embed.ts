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
 * partnerSlug   The partner slug every.org assigned to you. One of
 *               partnerSlug or partnerId is required.
 * partnerId     The partner id every.org assigned to you; an alternative to
 *               partnerSlug (takes precedence if both are given).
 * nonprofitSlug The every.org slug of the nonprofit to donate to.
 * onSuccess     Called when a donation completes.
 *
 * The form also takes the same customizations as an every.org donate link
 * (https://docs.every.org/docs/donate-link), as camelCase options: amount,
 * suggestedAmounts, frequency, email, firstName, lastName,
 * description, partnerDonationId, partnerMetadata, requireShareInfo,
 * shareInfo, designation, webhookToken, themeColor, method and code. See
 * EveryWidgetOptions below.
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
	/**
	 * The partner slug every.org assigned to you. One of partnerSlug or
	 * partnerId is required.
	 */
	partnerSlug?: string;
	/**
	 * The partner id every.org assigned to you; an alternative to partnerSlug
	 * and takes precedence over it.
	 */
	partnerId?: string;
	/** The every.org slug of the nonprofit to donate to. */
	nonprofitSlug: string;
	/** Called when a donation completes. */
	onSuccess?: () => void;

	/** Donation amount the form starts with. */
	amount?: number;
	/** Up to five suggested amounts shown as buttons below the amount field. */
	suggestedAmounts?: number[];
	/** Donation frequency the form starts with. */
	frequency?: 'ONCE' | 'MONTHLY';
	/** Donor's email. */
	email?: string;
	/** Donor's first name. */
	firstName?: string;
	/** Donor's last name. */
	lastName?: string;
	/** Replaces the text on the nonprofit's card in the form. */
	description?: string;
	/** A unique id of yours to associate with the donation. */
	partnerDonationId?: string;
	/**
	 * A base64 encoded JSON object that is forwarded to you in the partner
	 * webhook notification.
	 */
	partnerMetadata?: string;
	/** Require the donor to share their contact info with the nonprofit. */
	requireShareInfo?: boolean;
	/** Whether sharing contact info is checked by default. */
	shareInfo?: boolean;
	/**
	 * Designation for the donation. Every.org grants are unrestricted, so this
	 * is a recommendation to the nonprofit, not a legal restriction.
	 */
	designation?: string;
	/**
	 * Token of your partner webhook; a notification is sent to it for every
	 * donation completed through the form.
	 */
	webhookToken?: string;
	/**
	 * Primary theme color of the form as a 3 or 6 digit hex color, with or
	 * without the leading '#': for example '#009BF8'.
	 */
	themeColor?: string;
	/**
	 * Allowed donation methods: card, bank, paypal, venmo, pay (mobile
	 * payments), crypto, stocks, daf and ira. Either an array or a comma
	 * separated string.
	 */
	method?: string | string[];
	/**
	 * Code of a custom donate link created by the nonprofit; the form uses
	 * that link's settings. Options given here override them.
	 */
	code?: string;
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

	/**
	 * Options that are passed to the form as donate link URL parameters
	 * (https://docs.every.org/docs/donate-link), keyed by option name. The
	 * donate link's redirect parameters (no_exit, success_url, exit_url) are
	 * left out on purpose: the form lives in the page, so there is nowhere to
	 * exit or redirect to. Use onSuccess instead.
	 */
	var URL_PARAMS: {[K in keyof EveryWidgetOptions]?: string} = {
		partnerId: 'partnerId',
		partnerSlug: 'partnerSlug',
		amount: 'amount',
		suggestedAmounts: 'suggestedAmounts',
		frequency: 'frequency',
		email: 'email',
		firstName: 'first_name',
		lastName: 'last_name',
		description: 'description',
		partnerDonationId: 'partner_donation_id',
		partnerMetadata: 'partner_metadata',
		requireShareInfo: 'require_share_info',
		shareInfo: 'share_info',
		designation: 'designation',
		webhookToken: 'webhook_token',
		themeColor: 'theme_color',
		method: 'method',
		code: 'code'
	};

	function buildQuery(options: EveryWidgetOptions): string {
		var params: string[] = [];
		var name: keyof EveryWidgetOptions;
		for (name in URL_PARAMS) {
			var value: unknown = options[name];
			// Skip unset options; an empty value would override the form's default.
			if (value === undefined || value === null || value === '') {
				continue;
			}

			if (Array.isArray(value)) {
				if (value.length === 0) {
					continue;
				}

				value = value.join(',');
			}

			// The form expects the color as bare hex and ignores it otherwise.
			if (name === 'themeColor') {
				value = String(value).replace(/^#/, '');
			}

			params.push(URL_PARAMS[name] + '=' + encodeURIComponent(String(value)));
		}

		return params.join('&');
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

		if (
			(!options.partnerSlug && !options.partnerId) ||
			!options.nonprofitSlug
		) {
			console.error(
				'everyWidget: nonprofitSlug and one of partnerId or partnerSlug are required',
				options
			);
			return null;
		}

		var iframe = document.createElement('iframe');
		iframe.src =
			EMBED_ORIGIN +
			'/embed/' +
			encodeURIComponent(options.nonprofitSlug) +
			'/donate?' +
			buildQuery(options);
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
