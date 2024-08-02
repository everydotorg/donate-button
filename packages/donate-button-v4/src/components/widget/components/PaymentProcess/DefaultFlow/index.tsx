import {ErrorMessage} from 'src/components/widget/components/ErrorMessage';
import {DonationAmount} from 'src/components/widget/components/PaymentProcess/DonationAmount';
import {Frequency} from 'src/components/widget/components/PaymentProcess/Frequency';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {PrivateNote} from 'src/components/widget/components/PaymentProcess/PrivateNote';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formContainerCss,
	formCss,
	frequencyAndAmountCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const DefaultFlow = () => {
	const {frequency: fixedFrequency, amount: fixedAmount} = useConfigContext();
	const {
		frequency,
		donationAmount,
		selectedPaymentMethod,
		paymentRequestAvailable,
		submitError
	} = useWidgetContext();
	const submitDonation = useSubmitDonation();
	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<div
					className={frequencyAndAmountCss({
						horizontal: Boolean(fixedAmount && fixedFrequency),
						fixedAmount: Boolean(fixedAmount)
					})}
				>
					<Frequency />
					<DonationAmount />
				</div>
				<PrivateNote />
				<ErrorMessage message={submitError} />
				<SubmitButton
					disabled={
						!frequency || !donationAmount || Number.isNaN(donationAmount)
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
