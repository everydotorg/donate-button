import {createContext} from 'preact';
import {Routes} from 'src/helpers/options-types';

interface ShowFormContextValue {
	setRoute: (value: Routes) => void;
	route: Routes;
}

export const ShowFormContext = createContext<ShowFormContextValue>(
	{} as ShowFormContextValue
);

export default ShowFormContext;
