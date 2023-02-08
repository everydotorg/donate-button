import {useContext} from 'preact/hooks';
import {WidgetContext} from 'src/components/widget/context/WidgetContext';

export const useWidgetContext = () => useContext(WidgetContext);
