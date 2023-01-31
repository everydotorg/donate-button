import {useContext} from 'preact/hooks';
import {ConfigContext} from 'src/components/widget/context/ConfigContext';

export const useConfigContext = () => useContext(ConfigContext);
