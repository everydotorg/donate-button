import WIDGET_MODE from './constants/widgetMode';

export const experiment = () => {
	let mode = localStorage.getItem('every-month-widget-mode');
	if (!mode) {
		const rnd = Math.random();
		mode = rnd > 0.5 ? WIDGET_MODE.SINGLE : WIDGET_MODE.SPLIT_PANEL;
		localStorage.setItem('every-month-widget-mode', mode);
	}

	return {mode};
};

export default experiment;
