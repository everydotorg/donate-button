import {createContext} from 'preact';

export type AnimationValue = readonly [number, number];
interface DonationsContextValue {
	donationAmount?: string;
	setDonationAmount: (v: string) => void;
	monthlyDonation: boolean;
	setMonthlyDonation: (v: boolean) => void;
	customDonation: string;
	setCustomDonation: (v: string) => void;
	setTriggerAnimation: (v: AnimationValue) => void;
	customInputError: string;
	setCustomInputError: (v: string) => void;
}
export const DonationsContext = createContext<DonationsContextValue | null>(
	null
);

export default DonationsContext;
