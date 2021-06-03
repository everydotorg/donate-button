import {NonprofitInfo} from 'src/components/widget/types/nonprofit-info';

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

interface EveryNonprofit {
	name: string;
	logoCloudinaryId: string;
	coverImageCloudinaryId: string;
}

const mapNonprofitInfo = (nonprofitRawData: EveryNonprofit): NonprofitInfo => {
	return {
		name: nonprofitRawData.name,
		logo: getCloudinaryUrl(nonprofitRawData.logoCloudinaryId),
		backgroundImage: getCloudinaryUrl(nonprofitRawData.coverImageCloudinaryId)
	};
};

export const getNonprofitInfo = async (nonprofitSlug: string) => {
	const response = await fetch(`${BASE_EVERY_URL}${nonprofitSlug}`);
	const nonprofitRawData: EveryResponse = await response.json();

	return mapNonprofitInfo(nonprofitRawData.data.nonprofit);
};
