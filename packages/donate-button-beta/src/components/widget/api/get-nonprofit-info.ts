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

const countriesMock: DonationRecipient[] = [
	{
		id: 'covid.19.relief.india',
		name: 'United States',
		description: `Support COVID-19 Relief Fund: India with a donation to Give2Asia based in United States.`,
		countryCode: 'US',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay,
			PaymentMethod.Bank
		]
	},
	{
		id: 'covid.19.relief.india ',
		name: 'Australia',
		description: `Support COVID-19 Relief Fund: India with a donation to Give2Asia Australia.`,
		countryCode: 'AU',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay
		]
	},
	{
		id: 'covid.19.relief.india',
		name: 'Hong Kong',
		description: `Support COVID-19 Relief Fund: India with a donation to Give2Asia Foundation Limited based in Hong Kong.`,
		countryCode: 'HK',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay
		]
	}
	// {
	// 	id: 'covid.19.relief.india',
	// 	name: 'Give2Asia',
	// 	description: `Support Our World in Data from anywhere in the world.`,
	// 	countryCode: 'GLOBAL',
	// 	paymentMethods: [
	// 		PaymentMethod.Card,
	// 		PaymentMethod.ApplePay,
	// 		PaymentMethod.GooglePay
	// 	]
	// }
];

interface EveryNonprofit {
	name: string;
	logoCloudinaryId: string;
	coverImageCloudinaryId: string;
	eligibleDonationRecipientNonprofits?: DonationRecipient[];
}

const mapNonprofitInfo = (nonprofitRawData: EveryNonprofit): NonprofitInfo => {
	return {
		name: nonprofitRawData.name,
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
