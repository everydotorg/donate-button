import {DonateButtonOptions} from 'src/helpers/options-types';

// Temporary until we move the charity name up on the options object.
export const getCharityName = (
	widgetOptions: Partial<DonateButtonOptions>
): string => {
	if (typeof widgetOptions.onSubmit === 'function') {
		return '';
	}

	return widgetOptions.onSubmit?.charity ? widgetOptions.onSubmit?.charity : '';
};
