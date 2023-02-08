import {createContext, FunctionalComponent} from 'preact';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';
import {mergeConfig} from 'src/helpers/optionsTypes';

export const ConfigContext = createContext<WidgetConfig>({} as WidgetConfig);

export const ConfigContextProvider: FunctionalComponent<{
	options: Partial<WidgetConfig>;
}> = ({options, children}) => {
	const mergedConfig = mergeConfig(options);

	return (
		<ConfigContext.Provider value={mergedConfig}>
			{children}
		</ConfigContext.Provider>
	);
};
