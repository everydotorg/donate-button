import {useContext} from 'preact/hooks';
import {WidgetContext} from 'src/components/widget/context/widget-context';

export const useWidgetContext = () => useContext(WidgetContext);
