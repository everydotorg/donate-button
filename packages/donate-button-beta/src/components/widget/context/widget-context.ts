import {createContext} from 'preact';
import {Routes} from 'src/components/widget/types/routes';

interface WidgetContextProps {
	setRoute: (value: Routes) => void;
	route: Routes;
}

export const WidgetContext = createContext<WidgetContextProps>(
	{} as WidgetContextProps
);
