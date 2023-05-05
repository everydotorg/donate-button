import cxs from 'cxs';
import {CryptoAmountInput} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoAmountInput';
import {CryptoSelector} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoSelector';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {PrivateNote} from 'src/components/widget/components/PaymentProcess/PrivateNote';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	fieldSetCss,
	formContainerCss,
	formCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const CryptoFlow = () => {
	const submitDonation = useSubmitDonation();
	const {cryptoAmount, cryptoCurrency} = useWidgetContext();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<fieldset
					className={cxs({fieldSetCss, ...verticalStackCss.cxs(Spacing.XXL)})}
				>
					<div>
						<legend className={legendCss}>Crypto currency</legend>
						<CryptoSelector />
					</div>
					{cryptoCurrency && (
						<div>
							<legend className={legendCss}>Amount</legend>
							<CryptoAmountInput />
						</div>
					)}
				</fieldset>
				<PrivateNote />
				<SubmitButton disabled={!cryptoAmount || !cryptoCurrency}>
					{getSubmitButtonText({method: PaymentMethod.CRYPTO, cryptoCurrency})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
