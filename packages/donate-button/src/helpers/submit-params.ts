import {DonateButtonOptions} from 'src/helpers/options-types';

export const getSubmitParameters = (
	widgetOptions: Partial<DonateButtonOptions>
) => {
	if (typeof widgetOptions.onSubmit === 'function') {
		return {};
	}

	return widgetOptions.onSubmit?.charity ? widgetOptions.onSubmit?.params : {};
};
