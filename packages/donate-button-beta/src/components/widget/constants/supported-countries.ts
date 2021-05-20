import {Currency} from 'src/components/widget/types/currency';
import {PaymentMethod} from 'src/components/widget/types/payment-method';

export type Country = 'GB' | 'USA' | 'OTHER';

type CountryInfo = {
	displayName: string;
	currency: Currency;
	description: string;
	paymentMethods: PaymentMethod[];
};

export const supportedCountries: Record<Country, CountryInfo> = {
	GB: {
		displayName: 'Great Bretain',
		currency: 'GBP',
		description: `Support Our World in Data with a donation to Global Change Data Lab 
		(Charity Number 1186433) which qualifies as a charitable donation for UK tax purposes and is 
		eligible for GiftAid.`,
		paymentMethods: [
			PaymentMethod.Card,
			PaymentMethod.ApplePay,
			PaymentMethod.GooglePay
		]
	},
	USA: {
		displayName: 'United States',
		currency: 'USD',
		description: `Support Our World in Data with a donation to Every.org (EIN 61-1913297) 
		which qualifies as a charitable donation for US tax purposes.`,
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
	OTHER: {
		displayName: 'Other',
		currency: 'EUR',
		description: `Support Our World in Data from anywhere in the world.`,
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
};
