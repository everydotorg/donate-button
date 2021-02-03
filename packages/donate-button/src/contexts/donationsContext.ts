import {createContext} from 'preact';

interface DonationsContextValue {
  donationAmount?: number;
}
export const DonationsContext = createContext<DonationsContextValue>({});

export default DonationsContext;
