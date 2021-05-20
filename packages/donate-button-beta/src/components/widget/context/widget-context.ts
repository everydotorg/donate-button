import {createContext} from 'preact';
import {StateUpdater} from 'preact/hooks';
import {Country} from 'src/components/widget/constants/supported-countries';
import {Currency} from 'src/components/widget/types/currency';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {Routes} from 'src/components/widget/types/routes';

interface WidgetContextProps {
	showFrequencyPopover: boolean;
	dismissPopover: () => void;
	setRoute: StateUpdater<Routes>;
	route: Routes;
	frequency: DonationFrequency;
	country: Country;
	setCountry: StateUpdater<Country>;
	currency: Currency;
	setCurrency: StateUpdater<Currency>;
	donationAmount: number;
}

export const WidgetContext = createContext<WidgetContextProps>(
	{} as WidgetContextProps
);
