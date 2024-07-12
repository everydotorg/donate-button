import {render} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {CreateButtonInSelectorProps} from 'src/components/embed-button/types';
import {CreateWidgetInSelectorProps} from 'src/components/widget/types';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {loadFonts} from 'src/loadFonts';
import {FormLoader} from 'src/loaders/FormLoader';
import {WidgetLoader} from 'src/loaders/Widgetloader';
import resetcss from 'src/resetCss';

interface GlobalExport {
	createButton: (options: CreateButtonInSelectorProps) => void;
	createWidget: (options: CreateWidgetInSelectorProps) => void;
	setOptions: (options: Partial<WidgetConfig>) => void;
	showWidget: () => void;
}

declare const window: Window & {
	everyDotOrgDonateButton?: GlobalExport;
};

export default function formOnlyMode() {
	const DEFAULT_HASH_OPEN_WIDGET = 'donate';

	const baseOptions: Partial<WidgetConfig> = {};
	const options = {
		show: false,
		openAt: DEFAULT_HASH_OPEN_WIDGET
	};
	const instanceOptions: Partial<WidgetConfig> = {};

	const getNode = (element?: Element, selector?: string) =>
		element ? element : selector ? document.querySelector(selector) : null;

	loadFonts();

	/**
	 * Helper function to debug donate button issues
	 */
	function log(...messages: unknown[]): void {
		console.info('Every.org Donate Button:', ...messages);
	}

	let formContainer: HTMLElement;
	let formMountPoint: HTMLElement;

	const mountWidget = () => {
		const shadowWidgetWrapper = document.createElement('div');
		shadowWidgetWrapper.id = 'shadow-wrapper';
		formContainer.append(shadowWidgetWrapper);

		formMountPoint = document.createElement('div');
		shadowWidgetWrapper.attachShadow({mode: 'open'}).append(formMountPoint);

		const everyStyles: HTMLStyleElement | null =
			document.querySelector('#every-styles');

		if (everyStyles) {
			const rules = Object.values(everyStyles.sheet?.cssRules ?? {})
				.map((rule) => rule.cssText)
				.join('\n');

			const everyShadowStyles = document.createElement('style');
			everyShadowStyles.id = 'every-shadow-styles';
			everyShadowStyles.innerHTML = resetcss + rules;

			formMountPoint.append(everyShadowStyles);
		}
	};

	const renderWidget = () => {
		if (!formMountPoint) {
			mountWidget();
		}

		const finalOptions: Partial<WidgetConfig> = {
			...options,
			...baseOptions,
			...instanceOptions
		};

		render(<FormLoader options={finalOptions} />, formMountPoint);
	};

	function setOptions(newOptions: Partial<WidgetConfig>) {
		Object.assign(baseOptions, newOptions);
		renderWidget();
	}

	const createWidgetInSelector = ({
		element,
		selector,
		...options
	}: CreateWidgetInSelectorProps) => {
		if (!element && !selector) {
			log('createWidget():', 'must provide element or selector');
		}

		const node = getNode(element, selector);
		if (!node) {
			log('createWidget():', 'element or selector not found');
			return;
		}

		if (!options.nonprofitSlug) {
			log('createWidget():', 'must provide nonprofitSlug');
			return;
		}

		formContainer = node as HTMLElement;

		Object.assign(baseOptions, options);
		renderWidget();
	};

	window.everyDotOrgDonateButton = {
		createButton: () => {
			log(
				'createButton function is not available in formOnlyMode. Use createWidget instead.'
			);
		},
		showWidget: () => {
			log(
				'showWidget function is not available in formOnlyMode. Use createWidget instead.'
			);
		},
		setOptions,
		createWidget: createWidgetInSelector
	};
}
