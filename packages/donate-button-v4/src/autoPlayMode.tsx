import {render as preactRender} from 'preact';
import EmbedButton from 'src/components/embed-button';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {loadFonts} from 'src/loadFonts';
import {WidgetLoader} from 'src/loaders/Widgetloader';
import resetcss from 'src/resetCss';

const OBSERVER_OPTIONS = {
	childList: true,
	subtree: true
    attributeFilter: ['href']
};

interface CreateButtonProps extends Partial<WidgetConfig> {
	element: Element;
	nonprofitSlug: string;
	onClick: () => void;
}

interface CreateWidgetProps extends Partial<WidgetConfig> {
	nonprofitSlug: string;
}

let shadowRoot: ShadowRoot;
let widgetContainer: HTMLElement;

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

const parseUrl = (
	urlString: string
): (Partial<WidgetConfig> & {nonprofitSlug: string}) | undefined => {
	const url = new URL(urlString);

	const fundraiserSlug = url.pathname.split('/f/')[1];
	const nonprofitSlug = url.pathname.split('/')[1];

	if (!nonprofitSlug) {
		return;
	}

	return {
		fundraiserSlug,
		nonprofitSlug
	};
};

function mountShadowRoot() {
	const shadowWidgetWrapper = document.createElement('div');
	shadowWidgetWrapper.id = 'shadow-wrapper';
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

	const edoStyles: HTMLStyleElement | null =
		document.querySelector('#edo-styles');

	if (edoStyles) {
		const rules = Object.values(edoStyles.sheet?.cssRules ?? {})
			.map((rule) => rule.cssText)
			.join('\n');

		const edoShadowStyles = document.createElement('style');
		edoShadowStyles.id = 'edo-shadow-styles';
		edoShadowStyles.innerHTML = resetcss + rules;

		widgetContainer.append(edoShadowStyles);
	}
}

function createWidget(options: CreateWidgetProps) {
	if (!widgetContainer) {
		mountWidgetContainer();
	}

	const widgetMountPoint = document.createElement('div');
	widgetContainer.append(widgetMountPoint);

	return new WidgetController(options, widgetMountPoint);
}

function createButton({element, ...options}: CreateButtonProps) {
	if (!element.parentNode) {
		return;
	}

	const buttonContainer = element.parentNode as HTMLElement;

	preactRender(<EmbedButton {...options} />, buttonContainer, element);
}

export default function autoPlayMode() {
	loadFonts();

	const observer = new MutationObserver((_, observer) => {
		observer.disconnect();

		const links = document.querySelectorAll(
			"*[href^='https://www.every.org/']"
		);

		links.forEach((link) => {
			const urlString = link.getAttribute('href');
			if (urlString?.includes('#/donate')) {
				const options = parseUrl(urlString);

				if (!options) {
					return;
				}

				const widget = createWidget(options);

				createButton({
					element: link,
					onClick: () => {
						widget.show();
					},
					...options
				});
			}
		});
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
