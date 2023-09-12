import {VNode} from 'preact';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {AppleIcon} from 'src/components/widget/icons/AppleIcon';
import {BankIcon} from 'src/components/widget/icons/BankIcon';
import {CardIcon} from 'src/components/widget/icons/CardIcon';
import {CryptoIcon} from 'src/components/widget/icons/CryptoIcon';
import {DafIcon} from 'src/components/widget/icons/DafIcon';
import {GiftIcon} from 'src/components/widget/icons/GiftIcon';
import {GoogleIcon} from 'src/components/widget/icons/GoogleIcon';
import {PaypalIcon} from 'src/components/widget/icons/Paypalcon';
import {StocksIcon} from 'src/components/widget/icons/StocksIcon';
import {VenmoIcon} from 'src/components/widget/icons/VenmoIcon';
import {
	PaymentMethod,
	PaymentRequestAvailable
} from 'src/components/widget/types/PaymentMethod';

interface IconForPaymentMethodProps {
	method: PaymentMethod;
}

const IconForPaymentMethodMap: {
	[key in Exclude<PaymentMethod, PaymentMethod.PAYMENT_REQUEST>]: VNode;
} = {
	[PaymentMethod.CREDIT_CARD]: <CardIcon />,
	[PaymentMethod.BANK]: <BankIcon />,
	[PaymentMethod.PAYPAL]: <PaypalIcon />,
	[PaymentMethod.VENMO]: <VenmoIcon />,
	[PaymentMethod.CRYPTO]: <CryptoIcon />,
	[PaymentMethod.STOCKS]: <StocksIcon />,
	[PaymentMethod.DAF]: <DafIcon />,
	[PaymentMethod.GIFT_CARD]: <GiftIcon />
};

function getIconForPaymentMethod(
	method: PaymentMethod,
	paymentRequestAvailable: PaymentRequestAvailable
) {
	if (method === PaymentMethod.PAYMENT_REQUEST) {
		return paymentRequestAvailable.applePay ? <AppleIcon /> : <GoogleIcon />;
	}

	return IconForPaymentMethodMap[method];
}

export const IconForPaymentMethod = ({method}: IconForPaymentMethodProps) => {
	const {paymentRequestAvailable} = useWidgetContext();
	return getIconForPaymentMethod(method, paymentRequestAvailable);
};
