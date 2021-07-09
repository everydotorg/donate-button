import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

export interface NonprofitInfo {
	name: string;
	logo: string;
	backgroundImage: string;
	description: string;
	countries: DonationRecipient[];
}
