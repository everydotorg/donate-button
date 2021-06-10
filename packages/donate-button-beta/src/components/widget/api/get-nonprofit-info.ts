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
		id: 'abcdef',
		name: 'Give2Asia UK',
		description: `Support Our World in Data with a donation to Global Change Data Lab 
		(Charity Number 1186433) which qualifies as a charitable donation for UK tax purposes and is 
		eligible for GiftAid.`,
		countryCode: 'GB',
		currency: 'GBP',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay
		]
	},
	{
		id: 'qwerty',
		name: 'Give2Asia US',
		description: `Support Our World in Data with a donation to Every.org (EIN 61-1913297) 
		which qualifies as a charitable donation for US tax purposes.`,
		countryCode: 'US',
		currency: 'USD',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay,
			PaymentMethod.Bank,
			PaymentMethod.Crypto,
			PaymentMethod.DAF,
			PaymentMethod.Paypal,
			PaymentMethod.Stock,
			PaymentMethod.Wire
		]
	},
	{
		id: 'poiuy',
		name: 'Give2Asia HK',
		description: `Support Our World in Data from anywhere in the world.`,
		countryCode: 'HK',
		currency: 'EUR',
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay,
			PaymentMethod.Bank,
			PaymentMethod.Crypto,
			PaymentMethod.DAF,
			PaymentMethod.Paypal,
			PaymentMethod.Stock,
			PaymentMethod.Wire
		]
	}
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
