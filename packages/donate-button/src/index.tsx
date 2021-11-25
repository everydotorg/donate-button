import {render as prRender} from 'preact';
import EveryMonthLoader from 'src/every-month-loader';
import genericButtonLoader from 'src/generic-button-loader';
import {
	DonateButtonOptions,
	GenericButtonProps
} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';
const DEFAULT_HASH_OPEN_WIDGET = 'donate-widget';

const defaultOptions = {
	currency: 'USD'
};
const baseOptions = {
	openAt: DEFAULT_HASH_OPEN_WIDGET
};
let instanceOptions = {};

let mountPoint: HTMLElement;

const createButton = (
	selector: string,
	options: Partial<GenericButtonProps>,
	widgetOptions: Partial<DonateButtonOptions>
) => {
	const showWidget = () => {
		instanceOptions = {...widgetOptions};
		show();
	};

	const mergedWidgetOptions = {
		...defaultOptions,
		...baseOptions,
		...instanceOptions
	};
	genericButtonLoader({
		selector,
		options,
		onClick: showWidget,
		widgetOptions: mergedWidgetOptions
	});
};

const setOptions = (newOptions: Partial<DonateButtonOptions>) => {
	Object.assign(baseOptions, newOptions);
	render();
};

const show = () => {
	setOptions({show: true});
};

const hide = () => {
	setOptions({show: false});
};

const mount = () => {
	// We don't attach directly to body because is hiding the elements inside the body for some reason.
	const shadowRoot = document.createElement('div');
	document.body.append(shadowRoot);

	mountPoint = document.createElement('div');
	shadowRoot.attachShadow({mode: 'open'}).append(mountPoint);
};

let initiallyOpened = false;
const render = () => {
	if (!mountPoint) {
		mount();
	}

	const options = {
		...defaultOptions,
		...baseOptions,
		...instanceOptions
	};

	const hash = window.location?.hash;
	const shouldShowWidget =
		!initiallyOpened && hash === `#${options?.openAt ?? ''}`;

	if (shouldShowWidget) {
		Object.assign(baseOptions, {show: true});
		initiallyOpened = true;
	}

	prRender(<EveryMonthLoader options={options} hide={hide} />, mountPoint);
};

const setToggleButton = (
	selector: string,
	options: Partial<DonateButtonOptions>
) => {
	const button = document.querySelector(selector);
	if (!button) {
		return;
	}

	Object.assign(baseOptions, {
		openAt: options?.openAt ?? DEFAULT_HASH_OPEN_WIDGET
	});

	button.addEventListener('click', () => {
		instanceOptions = {...options};
		show();
	});
};

loadFonts();

interface EveryMonthWidget {
	setOptions: typeof setOptions;
	show: typeof show;
	showOnClick: typeof setToggleButton;
	createButton: typeof createButton;
}
declare const window: Window & {
	everyMonthWidget?: EveryMonthWidget;
};
window.everyMonthWidget = {
	setOptions,
	show,
	showOnClick: setToggleButton,
	createButton
};
