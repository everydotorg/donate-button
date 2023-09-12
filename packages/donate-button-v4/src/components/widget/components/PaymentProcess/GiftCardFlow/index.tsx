import {giftCardIconCss} from 'src/components/widget/components/PaymentProcess/GiftCardFlow/styles';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formCss,
	formContainerCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {GiftIcon} from 'src/components/widget/icons/GiftIcon';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const GiftCardFlow = () => {
	const submitDonation = useSubmitDonation();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<GiftIcon className={giftCardIconCss} />
				<p>Redeem a gift card to add donation credits to your account.</p>
				<SubmitButton>
					{getSubmitButtonText({method: PaymentMethod.GIFT_CARD})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
