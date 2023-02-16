import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export interface WidgetConfig  {
	nonprofitSlug: string;

	fundraiserSlug?: string;

	methods: PaymentMethod[];

	openAt: string;

	show: boolean;

	primaryColor: string;

	defaultDonationAmount?: number;

	minDonationAmount: number;

	defaultFrequency: DonationFrequency;

	addAmounts?: number[];

	completeDonationInNewTab?: boolean;

	noExit?: boolean;
};
