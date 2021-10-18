import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {Language} from 'src/components/widget/types/language';
import {InfoPage} from 'src/components/widget/types/pages';

export type WidgetConfig = {
	show: boolean;
	nonprofitSlug: string;
	name: string;
	locationAddress: string | null;
	description: string;
	descriptionLong: string;
	logo: string;
	backgroundImage: string;
	crypto: boolean; // @check: this is not used
	countrySelection: boolean; // @check: this is not used
	primaryColor: string;
	forceLanguage: string | false;
	defaultDonationAmount?: number;
	noExit?: boolean;
	currencies: CurrencyOption[];
	defaultFrequency: DonationFrequency;
	showInitialMessage?: boolean;
	showInputButtons?: boolean;
	showAlternatePayments?: boolean;
	countries: DonationRecipient[];
	infoPages: InfoPage[];
	i18n: {en: Language} & Record<string, Partial<Language>>;
};
