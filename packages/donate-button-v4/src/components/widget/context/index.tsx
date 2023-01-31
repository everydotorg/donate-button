import {FunctionComponent} from 'preact';
import {ConfigContextProvider} from 'src/components/widget/context/ConfigContext';
import {FundraiserContextProvider} from 'src/components/widget/context/FundraiserContext';
import {NonprofitContextProvider} from 'src/components/widget/context/NonprofitContext';
import {WidgetContextProvider} from 'src/components/widget/context/WidgetContext';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

export const ContextProvider: FunctionComponent<{
	options: Partial<WidgetConfig>;
	hide: () => void;
}> = ({options, hide, children}) => (
	<ConfigContextProvider options={options}>
		<WidgetContextProvider hide={hide}>
			<NonprofitContextProvider>
				<FundraiserContextProvider>{children}</FundraiserContextProvider>
			</NonprofitContextProvider>
		</WidgetContextProvider>
	</ConfigContextProvider>
);
