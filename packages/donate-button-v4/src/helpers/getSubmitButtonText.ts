import {CryptoCurrency} from 'src/components/widget/types/Crypto';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export function getSubmitButtonText({
	method,
	paymentRequestIsApplePay,
	cryptoCurrency
}: {
	method: PaymentMethod;
	paymentRequestIsApplePay?: boolean;
	cryptoCurrency?: CryptoCurrency;
}) {
	const base = 'Continue with ';
	switch (method) {
		case PaymentMethod.CREDIT_CARD:
			return base + 'credit or debit';
		case PaymentMethod.BANK:
			return base + 'bank';
		case PaymentMethod.PAYPAL:
			return base + 'PayPal';
		case PaymentMethod.VENMO:
			return base + 'Venmo';
		case PaymentMethod.PAYMENT_REQUEST:
			return base + (paymentRequestIsApplePay ? 'Apple Pay' : 'Google Pay');
		case PaymentMethod.DAF:
			return base + 'Chariot';
		case PaymentMethod.CRYPTO:
			return base + (cryptoCurrency ?? 'crypto');
		case PaymentMethod.GIFT_CARD:
			return 'Redeem gift card';
		default:
			return 'Continue';
	}
}
