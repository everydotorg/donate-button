import {ErrorMessage} from 'src/components/widget/components/ErrorMessage';
import {BackButton} from 'src/components/widget/components/PaymentProcess/BackButton';
import {
	DafFlowViewProps,
	DafFlowView
} from 'src/components/widget/components/PaymentProcess/DafFlow/types';
import {DonationAmount} from 'src/components/widget/components/PaymentProcess/DonationAmount';
import {Frequency} from 'src/components/widget/components/PaymentProcess/Frequency';
import {PrivateNote} from 'src/components/widget/components/PaymentProcess/PrivateNote';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formCss,
	formContainerCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const DafAmountView = ({changeView}: DafFlowViewProps) => {
	const submitDonation = useSubmitDonation();
	const {donationAmount, submitError} = useWidgetContext();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<BackButton
				handleClick={() => {
					changeView(DafFlowView.START);
				}}
			/>
			<div className={formContainerCss}>
				<h3>Connect your DAF with Chariot</h3>
				<Frequency />
				<DonationAmount />
				<PrivateNote />
				<ErrorMessage message={submitError} />
				<SubmitButton
					disabled={!donationAmount || Number.isNaN(donationAmount)}
				>
					{getSubmitButtonText({method: PaymentMethod.DAF})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
