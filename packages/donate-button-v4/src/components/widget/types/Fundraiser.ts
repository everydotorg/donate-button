// TODO: add more accurate type
export interface Fundraiser {
	id: string;
	slug: string;
	title: string;
	coverImageCloudinaryId: string | null;
	active: boolean;
	childrenFundraiserIds: string | null;
	createdAt: string | null;
	creatorNonprofitId: string | null;
	creatorUserId: string | null;
	description: string | null;
	endDate: string | null;
	entityName: string | null;
	eventIds: string | null;
	goalAmount: string | null;
	goalCurrency: string | null;
	metadata: string | null;
	nonprofitId: string;
	parentFundraiserId: string | null;
	pinnedAt: string | null;
	startDate: string | null;
}

export const FundraiserFetchError = Symbol('FundraiserFetchError');
export const FundraiserFetching = Symbol('FundraiserFetching');
