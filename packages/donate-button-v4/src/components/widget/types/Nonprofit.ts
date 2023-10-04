// TODO: add more accurate type
export interface Nonprofit {
	id: string;
	ein: string;
	name: string;
	primarySlug: string;
	profileUrl: string;
	directDisbursement?: boolean;
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
	};
}

export const NonprofitFetchError = Symbol('NonprofitFetchError');
export const NonprofitFetching = Symbol('NonprofitFetching');
