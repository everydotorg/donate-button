import cxs from 'cxs';
import {
	donationAmountInputContainerErrorCss,
	donationAmountInputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
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
import {TextInput} from 'src/components/widget/components/TextInput';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const StocksFlow = () => {
	const submitDonation = useSubmitDonation();

	const {primaryColor} = useConfigContext();

	const {
		stockAmount,
		stockSymbol,
		setStockAmount,
		setStockSymbol,
		submitError,
		setSubmitError
	} = useWidgetContext();

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<fieldset
					className={cxs({fieldSetCss, ...verticalStackCss.cxs(Spacing.XXL)})}
				>
					<div>
						<legend className={legendCss}>
							What is the symbol of the shares?
						</legend>
						<span>Example: GOOG</span>
						<TextInput
							id="stock-amount-input"
							inputClassName={donationAmountInputCss}
							containerClassName={
								submitError ? donationAmountInputContainerErrorCss : undefined
							}
							type="text"
							value={stockSymbol}
							onInput={(event) => {
								setStockSymbol(event.currentTarget.value);
								setSubmitError(null);
							}}
						/>
					</div>
					<div>
						<legend className={legendCss}>
							How many shares are you donating?
						</legend>
						<TextInput
							id="donation-input"
							inputClassName={donationAmountInputCss}
							containerClassName={
								submitError ? donationAmountInputContainerErrorCss : undefined
							}
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							min={0}
							step={1}
							value={stockAmount ? stockAmount : undefined}
							onInput={(event) => {
								setStockAmount(Number(event.currentTarget.value));
								setSubmitError(null);
							}}
						/>
					</div>
				</fieldset>
				<PrivateNote />
				<SubmitButton disabled={!stockAmount || !stockSymbol}>
					{getSubmitButtonText({method: PaymentMethod.STOCKS})}
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
