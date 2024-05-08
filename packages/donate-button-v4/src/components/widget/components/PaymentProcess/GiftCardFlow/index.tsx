import cxs from 'cxs';
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
import {TextInput} from 'src/components/widget/components/TextInput';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {GiftIcon} from 'src/components/widget/icons/GiftIcon';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const GiftCardFlow = () => {
	const submitDonation = useSubmitDonation();
	const {redeemGiftCardInFlow} = useConfigContext();
	const {giftCardCode, setGiftCardCode} = useWidgetContext();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<GiftIcon className={giftCardIconCss} />
				<p>Redeem a gift card to add donation credits to your account.</p>
				{redeemGiftCardInFlow && (
					<TextInput
						id="gift-card-code-input"
						type="text"
						value={giftCardCode}
						onInput={(event) => {
							setGiftCardCode(event.currentTarget.value);
						}}
					/>
				)}
				<SubmitButton>
					{getSubmitButtonText({method: PaymentMethod.GIFT_CARD})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};

export const giftCardCodeInputCss = cxs({
	fontSize: textSize.l.fontSize,
	lineHeight: textSize.l.fontSize,
	fontWeight: 700
});
