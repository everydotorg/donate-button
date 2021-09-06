import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {NonprofitInfo} from 'src/components/widget/types/nonprofit-info';
import {PaymentMethod} from 'src/components/widget/types/payment-method';

const BASE_EVERY_URL = 'https://partners.every.org/v0.2/nonprofit/';
const BASE_CLOUDINARY_URL =
	'https://res.cloudinary.com/everydotorg/image/upload/';

const getCloudinaryUrl = (filename: string) => {
	return `${BASE_CLOUDINARY_URL}${filename}`;
};

interface EveryResponse {
	message: string;
	data: {
		nonprofit: EveryNonprofit;
	};
}

const countriesMock: DonationRecipient[] = [];

interface EveryNonprofit {
	name: string;
	logoCloudinaryId: string;
	coverImageCloudinaryId: string;
	description: string;
	eligibleDonationRecipientNonprofits?: DonationRecipient[];
}

const mapNonprofitInfo = (nonprofitRawData: EveryNonprofit): NonprofitInfo => {
	return {
		name: nonprofitRawData.name,
		description: nonprofitRawData.description,
		logo: getCloudinaryUrl(nonprofitRawData.logoCloudinaryId),
		backgroundImage: getCloudinaryUrl(nonprofitRawData.coverImageCloudinaryId),
		countries:
			nonprofitRawData.eligibleDonationRecipientNonprofits ?? countriesMock
	};
};

export const getNonprofitInfo = async (nonprofitSlug: string) => {
	const response = await fetch(`${BASE_EVERY_URL}${nonprofitSlug}`);
	const nonprofitRawData: EveryResponse = await response.json();

	return mapNonprofitInfo(nonprofitRawData.data.nonprofit);
};
