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
		disablePrivateNotes?: boolean;
		prefixWithThe?: boolean;
		hideFundraiseButton?: boolean;
	};
	eligibleDonationRecipientNonprofitIds?: string[];
}

export enum DisbursementType {
	STRIPE_CONNECT = 'STRIPE_CONNECT',
	PAYPAL_GRANTS = 'PAYPAL_GRANTS',
	NFG_BATCH_FILE = 'NFG_BATCH_FILE',
	MANUAL = 'MANUAL'
}

export const NonprofitFetchError = Symbol('NonprofitFetchError');
export const NonprofitFetching = Symbol('NonprofitFetching');
