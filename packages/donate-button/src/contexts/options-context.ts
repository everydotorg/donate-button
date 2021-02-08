import {createContext} from 'preact';
import {DonateButtonOptions, defaultOptions} from 'src/helpers/options-types';

export const OptionsContext = createContext<DonateButtonOptions>(
	defaultOptions
);

export default OptionsContext;
