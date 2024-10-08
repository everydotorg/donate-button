export enum PaymentMethod {
	CREDIT_CARD = 'card',
	BANK = 'bank',
	PAYPAL = 'paypal',
	VENMO = 'venmo',
	PAYMENT_REQUEST = 'pay',
	CRYPTO = 'crypto',
	STOCKS = 'stocks',
	DAF = 'daf',
	GIFT_CARD = 'gift'
}

export const OneTimeFrequencyMethods = [
	PaymentMethod.VENMO,
	PaymentMethod.DAF,
	PaymentMethod.CRYPTO,
	PaymentMethod.STOCKS
];

export const AvailablePaymentMethods = Object.values(PaymentMethod);
export const DefaultPaymentMethods = AvailablePaymentMethods.filter(
	(pm) => pm !== PaymentMethod.GIFT_CARD
);
export interface PaymentRequestAvailable {
	googlePay: boolean;
	applePay: boolean;
}
export const PaymentMethodsOrder = [
	PaymentMethod.CREDIT_CARD,
	PaymentMethod.PAYPAL,
	PaymentMethod.GIFT_CARD,
	PaymentMethod.BANK,
	PaymentMethod.CRYPTO,
	PaymentMethod.DAF,
	PaymentMethod.VENMO,
	PaymentMethod.STOCKS,
	PaymentMethod.PAYMENT_REQUEST
];
