import {useContext} from 'preact/hooks';
import ShowFormContext from 'src/context/show-form-context';

const useShowForm = () => useContext(ShowFormContext);

export default useShowForm;
