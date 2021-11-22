import {render} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {WidgetConfig} from 'src/components/widget/types/widget-config';
import {
	DonateButtonOptions,
	EmbedButtonOptions
} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';
import {WidgetLoader} from 'src/loaders/widget-loader';

const DEFAULT_HASH_OPEN_WIDGET = 'donate-widget';
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

const getNodeList = (element?: Element, selector?: string) =>
	element ? [element] : selector && document.querySelectorAll(selector);

const createButtonInSelector = ({
	element,
	selector,
	...options
}: CreateButtonInSelectorProps) => {
	if (!element && !selector) {
		log('createButton():', 'must provide element or selector');
	}

	const nodes = getNodeList(element, selector);
	if (!nodes) {
		return;
	}

	for (const node of nodes) {
		render(<EmbedButton {...options} />, node);
	}
};

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
function initButtons(instanceOptions: Partial<EmbedButtonOptions> = {}) {
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

		// `options` has the crypto & slug extracted from the url
		// We preserve it over any custom config passed
		const finalOptions = {
			...instanceOptions,
			...options
		};

		const Button = <EmbedButton {...finalOptions} />;

		render(Button, buttonContainer, buttonLink);
		buttonContainer.setAttribute(INITIALIZED_ATTRIBUTE, '');
	}
}

let mountPoint: HTMLElement;
const options = {
	show: false,
	openAt: DEFAULT_HASH_OPEN_WIDGET
};
const baseOptions = {};
let instanceOptions = {};
const showWidget = () => {
	Object.assign(options, {show: true});

	renderWidget();
};

const hideWidget = () => {
	Object.assign(options, {show: false});

	renderWidget();
};

const setOptions = (newOptions: Partial<WidgetConfig>) => {
	Object.assign(baseOptions, newOptions);

	renderWidget();
};

const mount = () => {
	const shadowWidgetWrapper = document.createElement('div');
	shadowWidgetWrapper.id = 'shadow-wrapper';
	document.body.append(shadowWidgetWrapper);

	mountPoint = document.createElement('div');
	shadowWidgetWrapper.attachShadow({mode: 'open'}).append(mountPoint);

	const edoStyles: HTMLStyleElement | null = document.querySelector(
		'#edo-styles'
	);

	if (edoStyles) {
		const rules = Object.values(edoStyles.sheet?.cssRules ?? {})
			.map((rule) => rule.cssText)
			.join('\n');

		const edoShadowStyles = document.createElement('style');
		edoShadowStyles.id = 'edo-shadow-styles';
		edoShadowStyles.innerHTML = rules;

		mountPoint.append(edoShadowStyles);
	}
};

let initiallyOpened = false;
const renderWidget = () => {
	if (!mountPoint) {
		mount();
	}

	const finalOptions: Partial<WidgetConfig> = {
		...options,
		...baseOptions,
		...instanceOptions
	};

	const hash = window.location?.hash;
	const shouldShowWidget =
		!initiallyOpened && hash === `#${finalOptions?.openAt ?? ''}`;

	if (shouldShowWidget) {
		Object.assign(options, {show: true});
		initiallyOpened = true;
	}

	render(<WidgetLoader options={finalOptions} hide={hideWidget} />, mountPoint);
};

function updateOptionsAndShowCb(newOptions: WidgetConfig) {
	const optionsCopy = {...newOptions};
	Object.assign(options, {
		openAt: optionsCopy.openAt ?? DEFAULT_HASH_OPEN_WIDGET
	});
	return (event: any) => {
		event.preventDefault();
		instanceOptions = optionsCopy;
		showWidget();
	};
}

const createWidgetInSelector = ({element, selector, options = {}}: any) => {
	if (!element && !selector) {
		log('createWidget():', 'must provide element or selector');
	}

	const nodes = getNodeList(element, selector);
	if (!nodes) {
		return;
	}

	for (const node of nodes) {
		node.addEventListener('click', updateOptionsAndShowCb(options));
	}

	renderWidget();
};

interface GlobalExport {
	createButton: typeof createButtonInSelector;
	initButtons: typeof initButtons;
	showWidget: typeof showWidget;
	createWidget: typeof createWidgetInSelector;
	setOptions: typeof setOptions;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

window.everyDotOrgDonateButton = {
	createButton: createButtonInSelector,
	initButtons,
	showWidget,
	setOptions,
	createWidget: createWidgetInSelector
};
