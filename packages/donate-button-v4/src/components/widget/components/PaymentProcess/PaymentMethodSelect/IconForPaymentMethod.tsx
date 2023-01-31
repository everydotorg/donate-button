import {AppleIcon} from 'src/components/widget/icons/AppleIcon';
import {BankIcon} from 'src/components/widget/icons/BankIcon';
import {CardIcon} from 'src/components/widget/icons/CardIcon';
import {CryptoIcon} from 'src/components/widget/icons/CryptoIcon';
import {DafIcon} from 'src/components/widget/icons/DafIcon';
import {PaypalIcon} from 'src/components/widget/icons/Paypalcon';
import {StocksIcon} from 'src/components/widget/icons/StocksIcon';
import {VenmoIcon} from 'src/components/widget/icons/VenmoIcon';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

interface IconForPaymentMethodProps {
	method: PaymentMethod;
}

const IconForPaymentMethodMap = {
	[PaymentMethod.CREDIT_CARD]: <CardIcon />,
	[PaymentMethod.BANK]: <BankIcon />,
	[PaymentMethod.PAYPAL]: <PaypalIcon />,
	[PaymentMethod.VENMO]: <VenmoIcon />,
	[PaymentMethod.PAYMENT_REQUEST]: <AppleIcon />,
	[PaymentMethod.CRYPTO]: <CryptoIcon />,
	[PaymentMethod.STOCKS]: <StocksIcon />,
	[PaymentMethod.DAF]: <DafIcon />
};

export const IconForPaymentMethod = ({method}: IconForPaymentMethodProps) =>
	IconForPaymentMethodMap[method];
