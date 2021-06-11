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
	defaultDonationAmounts: {
		monthly: number;
		oneTime: number;
	};
	defaultFrequency: DonationFrequency;
	showInitialMessage: boolean;
	countries: DonationRecipient[];
	infoPages: InfoPage[];
	i18n: Record<string, Language>; // ISO Alpha-2 format
};
