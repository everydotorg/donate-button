import {render} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {
	DonateButtonOptions,
	EmbedButtonOptions
} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';

interface CreateButtonInSelectorProps extends EmbedButtonOptions {
	/**
	 * Where to render the button in
	 */
	selector: string;
}

const createButtonInSelector = ({
	selector,
	...options
}: CreateButtonInSelectorProps) => {
	const container = document.querySelector(selector);
	if (!container) {
		return;
	}

	const Button = <EmbedButton {...options} />;
	render(Button, container);
};

export default createButtonInSelector;

loadFonts();

/**
 * Helper function to debug donate button issues
 */
function log(...messages: unknown[]): void {
	console.info('Every.org Donate Button:', ...messages);
}

enum OptionsParseErrorType {
	BAD_DOMAIN = 'BAD_DOMAIN',
	NOT_DONATE_ROUTE = 'NOT_DONATE_ROUTE',
	OTHER = 'OTHER'
}
interface OptionsParseError {
	errorType: OptionsParseErrorType;
	error?: unknown;
}

/**
 * Extracts donate button options from an Every.org donate URL
 *
 * Expected format: http?://(www.)?every.org/:slug/donate(/crypto)?
 * @returns extracted options, or null if url isn't a valid Every.org donate URL
 */
function optionsFromEdoUrl(
	url: string
): DonateButtonOptions | OptionsParseError {
	try {
		const parsedUrl = new URL(url);
		if (!['www.every.org', 'every.org'].includes(parsedUrl.host)) {
			return {errorType: OptionsParseErrorType.BAD_DOMAIN};
		}

		const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
		if (pathParts.length < 2 || pathParts[1] !== 'donate') {
			return {errorType: OptionsParseErrorType.NOT_DONATE_ROUTE};
		}

		const nonprofitSlug = pathParts[0];
		const crypto = pathParts[2] === 'crypto';
		return {nonprofitSlug, crypto};
	} catch (error: unknown) {
		return {errorType: OptionsParseErrorType.OTHER, error};
	}
}

let initializingButtons = false;

const DONATE_BUTTON_CLASS = 'edo-donate-btn';
const INITIALIZED_ATTRIBUTE = 'data-edo-init';
function initButtons() {
	if (initializingButtons) {
		// Don't initialize multiple times at once to avoid race conditions
		return;
	}

	initializingButtons = true;
	try {
		for (const buttonContainer of document.querySelectorAll(
			// Don't double-initialize an initialized container
			`.${DONATE_BUTTON_CLASS}:not([${INITIALIZED_ATTRIBUTE}])`
		)) {
			// Search for an Every.org link inside the container
			const buttonLink = buttonContainer.querySelector('a');
			if (!buttonLink) {
				log('no link in container', buttonContainer);
				continue;
			}

			const href = buttonLink.getAttribute('href');
			if (!href) {
				log('link lacks href', buttonLink);
				continue;
			}

			const options = optionsFromEdoUrl(href);
			if ('errorType' in options) {
				log('could not extract options from link', {
					buttonLink,
					errorData: options
				});
				continue;
			}

			const Button = <EmbedButton {...options} />;

			buttonContainer.innerHTML = ''; // Clear the container first
			render(Button, buttonContainer);
			buttonContainer.setAttribute(INITIALIZED_ATTRIBUTE, '');
		}
	} finally {
		initializingButtons = false;
	}
}

interface GlobalExport {
	createButton: typeof createButtonInSelector;
	initButtons: typeof initButtons;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

window.everyDotOrgDonateButton = {
	createButton: createButtonInSelector,
	initButtons
};
