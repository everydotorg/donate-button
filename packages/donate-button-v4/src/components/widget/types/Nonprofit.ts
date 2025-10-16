// TODO: add more accurate type
export interface Nonprofit {
	id: string;
	ein: string;
	name: string;
	primarySlug: string;
	profileUrl: string;
	disbursementType?: DisbursementType | null;
	hasAdmin?: boolean;
	description: string | null;
	coverImageCloudinaryId: string | null;
	coverImageUrl: string | null;
	descriptionLong: string | null;
	isDisbursable: boolean;
	locationAddress: string | null;
	logoCloudinaryId: string | null;
	logoUrl: string | null;
	nteeCode: string | null;
	metadata?: {
		customTaxDeductible?: string;
		disabledPaymentFlowOptions?: string;
		disablePrivateNotes?: boolean;
		granteeName?: string;
		prefixWithThe?: boolean;
		hideFundraiseButton?: boolean;
	};
	eligibleDonationRecipientNonprofitIds?: string[];
}

export enum DisbursementType {
	STRIPE_CONNECT = 'Stripe',
	PAYPAL_GRANTS = 'PayPal Grants',
	NFG_BATCH_FILE = 'Network for Good',
	MANUAL = 'manual'
}

export const NonprofitFetchError = Symbol('NonprofitFetchError');
export const NonprofitFetching = Symbol('NonprofitFetching');
