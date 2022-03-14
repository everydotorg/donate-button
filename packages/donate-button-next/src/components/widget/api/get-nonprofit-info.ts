import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {NonprofitInfo} from 'src/components/widget/types/nonprofit-info';

const BASE_EVERY_URL = 'https://partners.every.org/v0.2/nonprofit';
const BASE_CLOUDINARY_URL =
	'https://res.cloudinary.com/everydotorg/image/upload/';

const getCloudinaryUrl = (filename: string) => {
	return `${BASE_CLOUDINARY_URL}${filename}`;
};

const countriesMock: DonationRecipient[] = [];

type EveryFundraiser = {
	id: string;
	title: string;
	description: string;
	coverImageCloudinaryId: string;
};

type EveryNonprofit = {
	name: string;
	logoCloudinaryId: string;
	coverImageCloudinaryId: string;
	description: string;
	eligibleDonationRecipientNonprofits?: DonationRecipient[];
	locationAddress: string | null;
};

type EveryResponse = {
	message: string;
	data: {
		nonprofit: EveryNonprofit;
	};
};

type FundraiserResponse = {
	data: {
		fundraiser: EveryFundraiser;
		nonprofits: Array<EveryNonprofit>;
	};
};

// Functions
const mapNonprofitInfo = (nonprofitRawData: EveryNonprofit): NonprofitInfo => {
	return {
		name: nonprofitRawData.name,
		locationAddress: nonprofitRawData.locationAddress,
		description: nonprofitRawData.description,
		logo: getCloudinaryUrl(nonprofitRawData.logoCloudinaryId),
		backgroundImage: getCloudinaryUrl(nonprofitRawData.coverImageCloudinaryId),
		countries:
			nonprofitRawData.eligibleDonationRecipientNonprofits ?? countriesMock,
		fundraiserId: undefined
	};
};

const mapFundraiserInfo = (data: FundraiserResponse['data']): NonprofitInfo => {
	const {fundraiser, nonprofits} = data;
	const nonprofit = nonprofits[0];

	return {
		name: fundraiser.title,
		locationAddress: nonprofit.locationAddress,
		description: fundraiser.description,
		logo: getCloudinaryUrl(nonprofit.logoCloudinaryId),
		backgroundImage: getCloudinaryUrl(fundraiser.coverImageCloudinaryId),
		countries: nonprofit.eligibleDonationRecipientNonprofits ?? countriesMock,
		fundraiserId: fundraiser.id
	};
};

const getNonprofitInfo = async (nonprofitSlug: string) => {
	const data: EveryResponse = await fetch(
		`${BASE_EVERY_URL}/${nonprofitSlug}`
	).then((response) => response.json());

	return mapNonprofitInfo(data.data.nonprofit);
};

async function getfundraiserInfo(
	nonprofitSlug: string,
	fundraiserSlug: string
) {
	const url = `${BASE_EVERY_URL}/${nonprofitSlug}/fundraiser/${fundraiserSlug}`;
	const data: FundraiserResponse = await fetch(url).then((response) =>
		response.json()
	);

	return mapFundraiserInfo(data.data);
}

export async function getEdoInfo(
	nonprofitSlug: string,
	fundraiserSlug?: string
) {
	if (fundraiserSlug) return getfundraiserInfo(nonprofitSlug, fundraiserSlug);

	return getNonprofitInfo(nonprofitSlug);
}
