import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export interface WidgetConfig {
	nonprofitSlug: string;

	fundraiserSlug?: string;

	methods: PaymentMethod[];

	openAt: string;

	show: boolean;

	primaryColor: string;

	/**
	 * @deprecated
	 * @see fixedDonationAmount
	 */
	defaultDonationAmount?: number;
	fixedDonationAmount?: number;

	minDonationAmount: number;

	/**
	 * @deprecated
	 * @see fixedFrequency
	 */
	defaultFrequency: DonationFrequency;
	fixedFrequency?: DonationFrequency;

	addAmounts?: number[];

	completeDonationInNewTab?: boolean;

	noExit?: boolean;

	monthlyTitle?: string;

	showGiftCardOption?: boolean;

	utmSource?: string;

	webhookToken?: string;

	redeemGiftCardInFlow?: boolean;
}
