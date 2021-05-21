import {NonprofitInfo} from 'src/components/widget/types/nonprofit-info';

const BASE_EVERY_URL = 'https://www.every.org/api/public/nonprofits/';
const BASE_CLOUDINARY_URL =
	'https://res.cloudinary.com/everydotorg/image/upload/';

const getCloudinaryUrl = (filename: string) => {
	return `${BASE_CLOUDINARY_URL}${filename}`;
};

const mapNonprofitInfo = (nonprofitRawData: any): NonprofitInfo => {
	return {
		name: nonprofitRawData.name,
		description: nonprofitRawData.description,
		descriptionLong: nonprofitRawData.descriptionLong,
		logo: getCloudinaryUrl(nonprofitRawData.logoCloudinaryId),
		backgroundImage: getCloudinaryUrl(nonprofitRawData.coverImageCloudinaryId)
	};
};

export const getNonprofitInfo = async (nonprofitSlug: string) => {
	const nonprofitRawData = await fetch(`${BASE_EVERY_URL}${nonprofitSlug}`);

	return mapNonprofitInfo(nonprofitRawData);
};
