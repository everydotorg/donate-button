import {render} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {CreateButtonInSelectorProps} from 'src/components/embed-button/types';
import {CreateWidgetInSelectorProps} from 'src/components/widget/types';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {loadFonts} from 'src/loadFonts';
import {WidgetLoader} from 'src/loaders/Widgetloader';

interface GlobalExport {
	createButton: (options: CreateButtonInSelectorProps) => void;
	createWidget: (options: CreateWidgetInSelectorProps) => void;
	setOptions: (options: Partial<WidgetConfig>) => void;
	showWidget: () => void;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

export default function manualMode() {
	const DEFAULT_HASH_OPEN_WIDGET = 'donate';

	const baseOptions: Partial<WidgetConfig> = {};
	const options = {
		show: false,
		openAt: DEFAULT_HASH_OPEN_WIDGET
	};
	let instanceOptions: Partial<WidgetConfig> = {};

	const getNodeList = (element?: Element, selector?: string) =>
		element ? [element] : selector && document.querySelectorAll(selector);

	loadFonts();

	/**
	 * Helper function to debug donate button issues
	 */
	function log(...messages: unknown[]): void {
		console.info('Every.org Donate Button:', ...messages);
	}

	let widgetMountPoint: HTMLElement;

	const mountWidget = () => {
		document.querySelector('#shadow-wrapper')?.remove();
		const shadowWidgetWrapper = document.createElement('div');
		shadowWidgetWrapper.id = 'shadow-wrapper';
		shadowWidgetWrapper.style.position = 'absolute';
		shadowWidgetWrapper.style.zIndex = '20000000';
		document.body.append(shadowWidgetWrapper);

		widgetMountPoint = document.createElement('div');
		shadowWidgetWrapper.attachShadow({mode: 'open'}).append(widgetMountPoint);

		const everyShadowStyles = document.createElement('style');
		everyShadowStyles.id = 'every-shadow-styles';

		widgetMountPoint.append(everyShadowStyles);
	};

	const renderWidget = () => {
		if (!widgetMountPoint) {
			mountWidget();
		}

		const hash = window.location?.hash;
		const shouldShowWidget =
			hash ===
			`#${
				instanceOptions?.openAt ?? baseOptions?.openAt ?? options?.openAt ?? ''
			}`;

		if (shouldShowWidget) {
			Object.assign(options, {show: true});
		}

		const finalOptions: Partial<WidgetConfig> = {
			...options,
			...baseOptions,
			...instanceOptions
		};

		render(
			<WidgetLoader options={finalOptions} hide={hideWidget} />,
			widgetMountPoint
		);
	};

	function showWidget() {
		Object.assign(options, {show: true});
		renderWidget();
	}

	function hideWidget() {
		Object.assign(options, {show: false});
		renderWidget();
	}

	function setOptions(newOptions: Partial<WidgetConfig>) {
		Object.assign(baseOptions, newOptions);
		renderWidget();
	}

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

	const createButtonInSelector = ({
		element,
		selector,
		...options
	}: CreateButtonInSelectorProps) => {
		if (!element && !selector && !options.nonprofitSlug) {
			log(
				'createButton():',
				'must provide element or selector or nonprofitSlug'
			);
		}

		const nodes = getNodeList(element, selector);

		if (!nodes) {
			return;
		}

		for (const buttonContainer of nodes) {
			// Search for an Every.org link inside the container
			const buttonLink = buttonContainer.querySelector('a') ?? undefined;
			if (!options.nonprofitSlug && !buttonLink) {
				log('no link in container', buttonContainer);
				return;
			}

			const href = buttonLink?.getAttribute('href') ?? undefined;

			if (!options.nonprofitSlug && !href) {
				log('link lacks href', buttonLink);
				return;
			}

			// We preserve it over any custom config passed
			const finalOptions = {
				...instanceOptions,
				...options
			};

			render(<EmbedButton {...finalOptions} />, buttonContainer, buttonLink);
		}
	};

	const createWidgetInSelector = ({
		element,
		selector,
		...options
	}: CreateWidgetInSelectorProps) => {
		if (!element && !selector) {
			log('createWidget():', 'must provide element or selector');
		}

		const nodes = getNodeList(element, selector);
		if (!nodes) {
			return;
		}

		if (!options.nonprofitSlug) {
			log('createWidget():', 'must provide nonprofitSlug');
			return;
		}

		for (const node of nodes) {
			node.addEventListener('click', updateOptionsAndShowCb(options));
		}

		Object.assign(baseOptions, options);
		renderWidget();
	};

	window.everyDotOrgDonateButton = {
		createButton: createButtonInSelector,
		showWidget,
		setOptions,
		createWidget: createWidgetInSelector
	};
}
