import {DonationAmount} from 'src/components/widget/components/PaymentProcess/DonationAmount';
import {Frequency} from 'src/components/widget/components/PaymentProcess/Frequency';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formContainerCss,
	formCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const DefaultFlow = () => {
	const {
		frequency,
		donationAmount,
		selectedPaymentMethod,
		paymentRequestAvailable
	} = useWidgetContext();
	const submitDonation = useSubmitDonation();
	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<Frequency />
				<DonationAmount />
				<SubmitButton
					disabled={
						frequency === DonationFrequency.Unselected ||
						!donationAmount ||
						Number.isNaN(donationAmount)
					}
				>
					{getSubmitButtonText({
						method: selectedPaymentMethod,
						paymentRequestIsApplePay: paymentRequestAvailable.applePay
					})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
