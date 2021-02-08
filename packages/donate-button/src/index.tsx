import {render as prRender} from 'preact';
import EveryMonthLoader from 'src/every-month-loader';
import {DonateButtonOptions} from 'src/helpers/options-types';
import {loadFonts} from 'src/load-fonts';

const defaultOptions = {
	currency: 'USD'
};
const baseOptions = {};
let instanceOptions = {};

let mountPoint: HTMLElement;

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

const render = () => {
	if (!mountPoint) {
		mount();
	}

	const options = {
		...defaultOptions,
		...baseOptions,
		...instanceOptions
	};
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
}
declare const window: Window & {
	everyMonthWidget?: EveryMonthWidget;
};
window.everyMonthWidget = {
	setOptions,
	show,
	showOnClick: setToggleButton
};
