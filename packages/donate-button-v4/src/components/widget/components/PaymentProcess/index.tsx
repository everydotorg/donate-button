import {GridCard} from 'src/components/widget/components/GridCard';
import {CryptoFlow} from 'src/components/widget/components/PaymentProcess/CryptoFlow';
import {DafFlow} from 'src/components/widget/components/PaymentProcess/DafFlow';
import {DefaultFlow} from 'src/components/widget/components/PaymentProcess/DefaultFlow';
import {StocksFlow} from 'src/components/widget/components/PaymentProcess/StocksFlow';
import {cardCss} from 'src/components/widget/components/PaymentProcess/styles';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

const DonateFlowForPaymentMethod = () => {
	const {selectedPaymentMethod} = useWidgetContext();

	switch (selectedPaymentMethod) {
		case PaymentMethod.CRYPTO:
			return <CryptoFlow />;
		case PaymentMethod.STOCKS:
			return <StocksFlow />;
		case PaymentMethod.DAF:
			return <DafFlow />;
		default:
			return <DefaultFlow />;
	}
};

export const PaymentProcess = () => {
	return (
		<GridCard className={cardCss}>
			<DonateFlowForPaymentMethod />
		</GridCard>
	);
};
