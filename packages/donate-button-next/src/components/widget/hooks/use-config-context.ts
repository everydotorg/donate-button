import {useContext} from 'preact/hooks';
import {ConfigContext} from 'src/components/widget/context/config-context';

export const useConfigContext = () => useContext(ConfigContext);
