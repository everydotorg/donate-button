import {DonationMode} from 'src/helpers/options-types';

export const experiment = () => {
	const modeFromStorage = localStorage.getItem('every-month-widget-mode');
	const mode: DonationMode =
		modeFromStorage &&
		(Object.values(DonationMode) as string[]).includes(modeFromStorage)
			? (modeFromStorage as DonationMode)
			: Math.random() > 0.5
			? DonationMode.SINGLE
			: DonationMode.SPLIT;
	if (!modeFromStorage) {
		localStorage.setItem('every-month-widget-mode', mode);
	}

	return {mode};
};

export default experiment;
