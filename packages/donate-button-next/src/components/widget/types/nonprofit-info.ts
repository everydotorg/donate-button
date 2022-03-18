import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

export interface NonprofitInfo {
	name: string;
	logo: string;
	locationAddress: string | null;
	backgroundImage: string;
	description: string;
	countries: DonationRecipient[];
	fundraiserId?: string;
}
