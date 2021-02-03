import {createContext} from 'preact';
import { DonationMode, DonationFrequency } from "src/helpers/options-types"

type OnSubmit = ((params: {amount: string, frequency: DonationFrequency}) => void) | {

}
interface OptionsContextValue {
  onSubmit?: OnSubmit,
  currency: string,
  mode: DonationMode
}
export const OptionsContext = createContext<OptionsContextValue>({});

export default OptionsContext;
