import cxs from 'cxs';
import applePayLogo from 'src/assets/payments/apple-pay.png';
import bankLogo from 'src/assets/payments/bank.svg';
import cardLogo from 'src/assets/payments/card.svg';
import cryptoLogo from 'src/assets/payments/crypto.svg';
import genericLogo from 'src/assets/payments/generic.svg';
import googlePayLogo from 'src/assets/payments/google-pay.png';
import paypalLogo from 'src/assets/payments/paypal.svg';
import {COLORS} from 'src/components/widget/theme/colors';
import {smallText} from 'src/components/widget/theme/font-sizes';
import {PaymentMethod as PaymentMethodType} from 'src/components/widget/types/payment-method';

type PaymentDisplayInfo = {logo: string; label: string};
const paymentMethodsLogos: Record<PaymentMethodType, PaymentDisplayInfo> = {
	[PaymentMethodType.ApplePay]: {
		logo: applePayLogo,
		label: 'Apple pay'
	},
	[PaymentMethodType.Bank]: {logo: bankLogo, label: 'Bank'},
	[PaymentMethodType.Card]: {logo: cardLogo, label: 'Card'},
	[PaymentMethodType.Crypto]: {logo: cryptoLogo, label: 'Crypto'},
	[PaymentMethodType.GooglePay]: {logo: googlePayLogo, label: 'Google Pay'},
	[PaymentMethodType.Paypal]: {logo: paypalLogo, label: 'Paypal'},
	[PaymentMethodType.DAF]: {logo: genericLogo, label: 'DAF'},
	[PaymentMethodType.Stock]: {logo: genericLogo, label: 'Stock'},
	[PaymentMethodType.Wire]: {logo: genericLogo, label: 'Wire'}
};

const containerCss = cxs({
	display: 'flex',
	alignItems: 'center'
});

const logoCss = cxs({
	height: '1rem',
	width: 'auto',
	marginRight: '0.25rem'
});

const labelCss = cxs({
	...smallText,
	color: COLORS.TextGray,
	transform: 'translateY(0.07em)'
});

export const PaymentMethod = ({
	paymentMethod
}: {
	paymentMethod: PaymentMethodType;
}) => {
	const paymentInfo = paymentMethodsLogos[paymentMethod];

	return (
		<div className={containerCss}>
			<img
				src={paymentInfo.logo}
				alt="Payment method logo"
				className={logoCss}
			/>
			<span className={labelCss}>{paymentInfo.label}</span>
		</div>
	);
};
