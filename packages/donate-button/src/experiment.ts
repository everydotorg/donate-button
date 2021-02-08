import {LayoutMode} from 'src/helpers/options-types';

export const experiment = () => {
	const modeFromStorage = localStorage.getItem('every-month-widget-mode');
	const mode: LayoutMode =
		modeFromStorage &&
		(Object.values(LayoutMode) as string[]).includes(modeFromStorage)
			? (modeFromStorage as LayoutMode)
			: Math.random() > 0.5
			? LayoutMode.SINGLE
			: LayoutMode.SPLIT;
	if (!modeFromStorage) {
		localStorage.setItem('every-month-widget-mode', mode);
	}

	return {mode};
};

export default experiment;
