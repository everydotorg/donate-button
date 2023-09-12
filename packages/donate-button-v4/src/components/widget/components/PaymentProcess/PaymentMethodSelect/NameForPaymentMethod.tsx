import cxs from 'cxs';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {
	PaymentMethod,
	PaymentRequestAvailable
} from 'src/components/widget/types/PaymentMethod';

const NameForPaymentMethodMap: {
	[key in Exclude<PaymentMethod, PaymentMethod.PAYMENT_REQUEST>]: string;
} = {
	[PaymentMethod.CREDIT_CARD]: 'Card',
	[PaymentMethod.BANK]: 'Bank',
	[PaymentMethod.PAYPAL]: 'PayPal',
	[PaymentMethod.VENMO]: 'Venmo',
	[PaymentMethod.GIFT_CARD]: 'Gift card',
	[PaymentMethod.CRYPTO]: 'Crypto',
	[PaymentMethod.STOCKS]: 'Stocks',
	[PaymentMethod.DAF]: 'DAF'
};

function getNameForPaymentMethod(
	method: PaymentMethod,
	paymentRequestAvailable: PaymentRequestAvailable
) {
	if (method === PaymentMethod.PAYMENT_REQUEST) {
		return paymentRequestAvailable.applePay ? 'Apple Pay' : 'Google Pay';
	}

	return NameForPaymentMethodMap[method];
}

interface NameForPaymentMethodProps {
	method: PaymentMethod;
}

export const NameForPaymentMethod = ({method}: NameForPaymentMethodProps) => {
	const {paymentRequestAvailable} = useWidgetContext();

	const name = getNameForPaymentMethod(method, paymentRequestAvailable);
	return <span className={cxs({...textSize.s})}>{name}</span>;
};
