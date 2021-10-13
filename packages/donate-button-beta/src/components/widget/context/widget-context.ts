import {createContext} from 'preact';
import {StateUpdater} from 'preact/hooks';
import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {Routes} from 'src/components/widget/types/routes';

interface WidgetContextProps {
	showFrequencyPopover: boolean;
	dismissPopover: () => void;
	setRoute: (r: Routes) => void;
	route: string;
	frequency: DonationFrequency;
	country: DonationRecipient;
	setCountry: StateUpdater<DonationRecipient>;
	currency: CurrencyOption;
	setCurrency: StateUpdater<CurrencyOption>;
	donationAmount?: number;
	setDonationAmount: StateUpdater<number | undefined>;
	hideWidget: () => void;
}

export const WidgetContext = createContext<WidgetContextProps>(
	{} as WidgetContextProps
);
