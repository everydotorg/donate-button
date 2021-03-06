import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {Language} from 'src/components/widget/types/language';
import {InfoPage} from 'src/components/widget/types/pages';

export type WidgetConfig = {
	show: boolean;
	nonprofitSlug: string;
	name: string;
	description: string;
	descriptionLong: string;
	logo: string;
	backgroundImage: string;
	crypto: boolean;
	countrySelection: boolean;
	primaryColor: string;
	forceLanguage: string | false;
	defaultDonationAmount?: number;
	currencies: CurrencyOption[];
	defaultFrequency: DonationFrequency;
	showInitialMessage: boolean;
	countries: DonationRecipient[];
	infoPages: InfoPage[];
	i18n: {en: Language} & Record<string, Partial<Language>>;
};
