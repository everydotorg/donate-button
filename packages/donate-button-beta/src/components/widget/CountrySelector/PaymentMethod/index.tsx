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
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {PaymentMethod as PaymentMethodType} from 'src/components/widget/types/payment-method';

type PaymentDisplayInfo = {logo: string; label: string};

const paymentMethodsLogos: Record<PaymentMethodType, PaymentDisplayInfo> = {
	[PaymentMethodType.ApplePay]: {
		logo: applePayLogo,
		label: ''
	},
	[PaymentMethodType.Bank]: {logo: bankLogo, label: 'Bank'},
	[PaymentMethodType.Card]: {logo: cardLogo, label: 'Card'},
	[PaymentMethodType.Crypto]: {logo: cryptoLogo, label: 'Crypto'},
	[PaymentMethodType.GooglePay]: {logo: googlePayLogo, label: ''},
	[PaymentMethodType.Paypal]: {logo: paypalLogo, label: 'Paypal'},
	[PaymentMethodType.DAF]: {logo: genericLogo, label: 'DAF'},
	[PaymentMethodType.Stock]: {logo: genericLogo, label: 'Stock'},
	[PaymentMethodType.Wire]: {logo: genericLogo, label: 'Wire'}
};

const containerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	border: `1px solid ${COLORS.LightGray}`,
	borderRadius: Radii.Small,
	padding: Spacing.XXS
});

const logoCss = cxs({
	height: '12px',
	width: 'auto'
});

const labelCss = cxs({
	...smallText,
	transform: 'translateY(0.07em)',
	whiteSpace: 'nowrap',
	marginLeft: Spacing.XXS
});

type PaymentMethodProps = {
	paymentMethod: PaymentMethodType;
	classes: string[];
};

export const PaymentMethod = ({paymentMethod, classes}: PaymentMethodProps) => {
	const paymentInfo = paymentMethodsLogos[paymentMethod];

	return (
		<div className={[containerCss, ...classes].join(' ')}>
			<img
				src={paymentInfo.logo}
				alt="Payment method logo"
				className={logoCss}
			/>

			{paymentInfo.label && (
				<span className={labelCss}>{paymentInfo.label}</span>
			)}
		</div>
	);
};
