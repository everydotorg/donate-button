import {createContext} from 'preact';
import {WidgetConfig} from 'src/components/widget/types/widget-config';

export const ConfigContext = createContext<WidgetConfig>({} as WidgetConfig);
