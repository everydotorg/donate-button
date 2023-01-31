export enum PaymentMethod {
	CREDIT_CARD = 'card',
	BANK = 'bank',
	PAYPAL = 'paypal',
	VENMO = 'venmo',
	PAYMENT_REQUEST = 'pay',
	CRYPTO = 'crypto',
	STOCKS = 'stocks',
	DAF = 'daf'
}

export const DisabledPaymentMethods = [PaymentMethod.PAYMENT_REQUEST];

export const AvailablePaymentMethods = Object.values(PaymentMethod).filter(
	(method) => !DisabledPaymentMethods.includes(method)
);

export const NameForPaymentMethodMap = {
	[PaymentMethod.CREDIT_CARD]: 'Card',
	[PaymentMethod.BANK]: 'Bank',
	[PaymentMethod.PAYPAL]: 'PayPal',
	[PaymentMethod.VENMO]: 'Venmo',
	[PaymentMethod.PAYMENT_REQUEST]: 'Apple pay',
	[PaymentMethod.CRYPTO]: 'Crypto',
	[PaymentMethod.STOCKS]: 'Stocks',
	[PaymentMethod.DAF]: 'DAF'
};
