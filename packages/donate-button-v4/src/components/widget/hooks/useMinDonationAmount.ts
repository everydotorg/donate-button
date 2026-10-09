import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

const DAF_MIN_DONATION_AMOUNT = 50;

export const useMinDonationAmount = () => {
	const {minDonationAmount} = useConfigContext();
	const {selectedPaymentMethod} = useWidgetContext();

	return selectedPaymentMethod === PaymentMethod.DAF
		? Math.max(minDonationAmount, DAF_MIN_DONATION_AMOUNT)
		: minDonationAmount;
};
