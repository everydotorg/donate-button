import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {
	formContainerCss,
	formCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';

export const DafFlow = () => {
	const submitDonation = useSubmitDonation();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<div>DafFlow</div>
				<RedirectNotice />
			</div>
		</form>
	);
};
