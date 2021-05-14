import {render} from 'preact';
import EmbedButton from 'src/components/embed-button';
import Widget from 'src/components/widget';
import {
	DonateButtonOptions,
	EmbedButtonOptions
} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';

interface CreateButtonInSelectorProps extends EmbedButtonOptions {
	/**
	 * Element to render button in; takes precedence over selector
	 */
	element?: Element;
	/**
	 * Selector to render button in
	 */
	selector?: string;
}

const createButtonInSelector = ({
	element,
	selector,
	...options
}: CreateButtonInSelectorProps) => {
	if (!element && !selector) {
		log('createButton():', 'must provide element or selector');
	}

	const container = element || (selector && document.querySelector(selector));
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

const DONATE_BUTTON_CLASS = 'edo-donate-btn';
const INITIALIZED_ATTRIBUTE = 'data-edo-init';
function initButtons() {
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

		render(Button, buttonContainer, buttonLink);
		buttonContainer.setAttribute(INITIALIZED_ATTRIBUTE, '');
	}
}

let mountPoint: HTMLElement;
const options = {
	show: false
};
const showWidget = () => {
	Object.assign(options, {show: true});

	renderWidget();
};

const mount = () => {
	// We don't attach directly to body because is hiding the elements inside the body for some reason.
	const widgetWrapper = document.createElement('div');
	document.body.append(widgetWrapper);

	mountPoint = document.createElement('div');
	widgetWrapper.append(mountPoint);
};

const renderWidget = () => {
	if (!mountPoint) {
		mount();
	}

	render(<Widget {...options} />, mountPoint);
};

interface GlobalExport {
	createButton: typeof createButtonInSelector;
	initButtons: typeof initButtons;
	showWidget: typeof showWidget;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

window.everyDotOrgDonateButton = {
	createButton: createButtonInSelector,
	initButtons,
	showWidget
};
