import {createContext} from 'preact';
import {StateUpdater} from 'preact/hooks';
import {Country} from 'src/components/widget/constants/supported-countries';
import {Currency} from 'src/components/widget/types/currency';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

interface WidgetContextProps {
	showFrequencyPopover: boolean;
	dismissPopover: () => void;
	setRoute: StateUpdater<string>;
	route: string;
	frequency: DonationFrequency;
	country: Country;
	setCountry: StateUpdater<Country>;
	currency: Currency;
	setCurrency: StateUpdater<Currency>;
	donationAmount: number;
	setDonationAmount: StateUpdater<number>;
}

export const WidgetContext = createContext<WidgetContextProps>(
	{} as WidgetContextProps
);
