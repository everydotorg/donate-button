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
	 * @see amount
	 */
	defaultDonationAmount?: number;

	amount?: number;

	minDonationAmount: number;

	/**
	 * @deprecated
	 * @see frequency
	 */
	defaultFrequency: DonationFrequency;

	frequency?: DonationFrequency;

	addAmounts?: number[];

	completeDonationInNewTab?: boolean;

	noExit?: boolean;

	monthlyTitle?: string;

	showGiftCardOption?: boolean;

	utmSource?: string;

	webhookToken?: string;

	redeemGiftCardInFlow?: boolean;

	designation?: string;

	requireShareInfo?: boolean;

	previewMode?: boolean;
}
