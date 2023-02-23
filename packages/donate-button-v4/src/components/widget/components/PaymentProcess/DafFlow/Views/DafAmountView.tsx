import {BackButton} from 'src/components/widget/components/PaymentProcess/BackButton';
import {
	DafFlowViewProps,
	DafFlowView
} from 'src/components/widget/components/PaymentProcess/DafFlow/types';
import {DonationAmount} from 'src/components/widget/components/PaymentProcess/DonationAmount';
import {Frequency} from 'src/components/widget/components/PaymentProcess/Frequency';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formCss,
	formContainerCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const DafAmountView = ({changeView}: DafFlowViewProps) => {
	const {frequency, donationAmount} = useWidgetContext();

	return (
		<div className={formCss}>
			<BackButton
				handleClick={() => {
					changeView(DafFlowView.START);
				}}
			/>
			<div className={formContainerCss}>
				<h3>Connect your DAF with Chariot</h3>
				<Frequency />
				<DonationAmount />
				<SubmitButton
					disabled={
						frequency === DonationFrequency.Unselected ||
						!donationAmount ||
						Number.isNaN(donationAmount)
					}
				>
					{getSubmitButtonText(donationAmount, frequency)}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</div>
	);
};
