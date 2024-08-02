import {render as preactRender} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {parseDonateUrl} from 'src/helpers/parseDonateUrl';
import shouldApplyEveryStyleForAllLinks from 'src/helpers/shouldApplyEveryStyleForAllLinks';
import {loadFonts} from 'src/loadFonts';
import {WidgetLoader} from 'src/loaders/Widgetloader';
import resetcss from 'src/resetCss';

const OBSERVER_OPTIONS = {
	childList: true,
	subtree: true,
	attributeFilter: ['href']
};

interface CreateButtonProps extends Partial<WidgetConfig> {
	element: Element;
	nonprofitSlug: string;
	onClick: () => void;
	url?: string;
}

interface CreateWidgetProps extends Partial<WidgetConfig> {
	nonprofitSlug: string;
}

let shadowRoot: ShadowRoot;
let widgetContainer: HTMLElement;
const widgetsMap = new Map<string, WidgetController>();
const applyEveryStyleForAllLinks = shouldApplyEveryStyleForAllLinks();

class WidgetController {
	options: CreateWidgetProps;
	mountPoint: HTMLElement;
	constructor(options: CreateWidgetProps, mountPoint: HTMLElement) {
		this.options = options;
		this.mountPoint = mountPoint;
	}

	hide() {
		this.options.show = false;
		this.render();
	}

	show() {
		this.options.show = true;
		this.render();
	}

	setOptions(options: WidgetConfig) {
		this.options = options;
		this.render();
	}

	render() {
		preactRender(
			<WidgetLoader
				options={this.options}
				hide={() => {
					this.hide();
				}}
			/>,
			this.mountPoint
		);
	}
}

function mountShadowRoot() {
	const shadowWidgetWrapper = document.createElement('div');
	shadowWidgetWrapper.id = 'shadow-wrapper';
	shadowWidgetWrapper.style.position = 'absolute';
	shadowWidgetWrapper.style.zIndex = '20000000';
	document.body.append(shadowWidgetWrapper);
	shadowRoot = shadowWidgetWrapper.attachShadow({mode: 'open'});
}

function mountWidgetContainer() {
	if (!shadowRoot) {
		mountShadowRoot();
	}

	widgetContainer = document.createElement('div');
	widgetContainer.id = 'widget-container';
	shadowRoot.append(widgetContainer);

	const everyStyles: HTMLStyleElement | null =
		document.querySelector('#every-styles');

	if (everyStyles) {
		const rules = Object.values(everyStyles.sheet?.cssRules ?? {})
			.map((rule) => rule.cssText)
			.join('\n');

		const everyShadowStyles = document.createElement('style');
		everyShadowStyles.id = 'every-shadow-styles';
		everyShadowStyles.innerHTML = resetcss + rules;

		widgetContainer.append(everyShadowStyles);
	}
}

function createWidget(options: CreateWidgetProps, urlString: string) {
	if (!widgetContainer) {
		mountWidgetContainer();
	}

	const widgetMountPoint = document.createElement('div');
	widgetContainer.append(widgetMountPoint);

	const widget = new WidgetController(options, widgetMountPoint);
	widgetsMap.set(urlString, widget);
	return widget;
}

function createButton({element, ...options}: CreateButtonProps) {
	if (!element.parentNode) {
		return;
	}

	const buttonContainer = element.parentNode as HTMLElement;

	preactRender(<EmbedButton {...options} />, buttonContainer, element);
}

function findAndReplaceLinks() {
	const links = document.querySelectorAll("*[href^='https://www.every.org/']");

	links.forEach((link) => {
		const urlString = link.getAttribute('href');
		if (urlString?.includes('#/donate')) {
			const options = parseDonateUrl(urlString);

			if (!options) {
				return;
			}

			const widget =
				widgetsMap.get(urlString) ?? createWidget(options, urlString);

			if (
				applyEveryStyleForAllLinks ||
				link.getAttribute('data-every-style') !== null
			) {
				createButton({
					element: link,
					onClick: () => {
						widget.show();
					},
					...options,
					url: urlString
				});
			} else {
				link.addEventListener('click', (event) => {
					event.preventDefault();
					widget.show();
				});
			}
		}
	});
}

export default function autoPlayMode() {
	loadFonts();
	findAndReplaceLinks();

	const observer = new MutationObserver((mutations, observer) => {
		// disconnect before changing DOM so as not to cause an infinite loop
		observer.disconnect();

		const isLinksChanged = Boolean(
			mutations.some((mutation) => mutation.target.nodeName === 'A')
		);

		if (isLinksChanged) {
			findAndReplaceLinks();
		}

		observer.observe(document, OBSERVER_OPTIONS);
	});

	observer.observe(document, OBSERVER_OPTIONS);
}

declare const window: Window &
	typeof globalThis & {
		WebKitMutationObserver: MutationObserver;
		MozMutationObserver: MutationObserver;
	};

const MutationObserver =
	window.MutationObserver ||
	window.WebKitMutationObserver ||
	window.MozMutationObserver;
