import {render} from 'preact';
import EmbedButton, {
	DONATE_BTN_DATA_ATTRIBUTE
} from 'src/components/embed-button';
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
 * Extracts donate button options from an Every.org donate URL
 *
 * Expected format: http?://(www.)?every.org/:slug/donate(/crypto)?
 * @returns extracted options, or null if url isn't a valid Every.org donate URL
 */
function optionsFromEdoUrl(url: string): DonateButtonOptions | null {
	try {
		const parsedUrl = new URL(url);
		if (!['www.every.org', 'every.org'].includes(parsedUrl.host)) {
			return null;
		}

		const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
		if (pathParts.length < 2 || pathParts[1] !== 'donate') {
			return null;
		}

		const nonprofitSlug = pathParts[0];
		const crypto = pathParts[2] === 'crypto';
		return {nonprofitSlug, crypto};
	} catch {
		return null;
	}
}

const EDO_CLASS_NAME = 'edo-donate-btn';
function initButtons() {
	for (const buttonContainer of document.querySelectorAll(
		`.${EDO_CLASS_NAME}`
	)) {
		if (buttonContainer.querySelector(`[${DONATE_BTN_DATA_ATTRIBUTE}]`)) {
			// A prior run of `initButtons()` already included this donate button,
			// refusing to replace it
			continue;
		}

		// Search for an Every.org link inside the container
		const buttonLink = buttonContainer.querySelector('a');
		if (!buttonLink) {
			return null;
		}

		const href = buttonLink.getAttribute('href');
		if (!href) {
			return null;
		}

		const options = optionsFromEdoUrl(href);
		if (!options) {
			continue;
		}

		const Button = <EmbedButton {...options} />;

		buttonContainer.innerHTML = '';
		render(Button, buttonContainer);
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
