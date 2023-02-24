import cxs from 'cxs';
import {CryptoSelector} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoSelector';
import {cryptoAmountInputContainerCss} from 'src/components/widget/components/PaymentProcess/CryptoFlow/styles';
import {
	inputContainerCss,
	inputContainerErrorCss,
	inputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	fieldSetCss,
	formContainerCss,
	formCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import joinClassNames from 'src/helpers/joinClassNames';

export const CryptoFlow = () => {
	const submitDonation = useSubmitDonation();

	const {primaryColor} = useConfigContext();

	const {
		cryptoAmount,
		setCryptoAmount,
		cryptoCurrency,
		setCryptoCurrency,
		submitError,
		setSubmitError
	} = useWidgetContext();

	const inputContainerClasses = joinClassNames([
		inputContainerCss(primaryColor),
		cryptoAmountInputContainerCss,
		...(submitError ? [inputContainerErrorCss] : [])
	]);

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
						<CryptoSelector
							value={cryptoCurrency}
							onChange={(cryptoCurrency?: string) => {
								setCryptoCurrency(cryptoCurrency);
								setSubmitError(null);
							}}
						/>
					</div>
					<div>
						<legend className={legendCss}>Amount</legend>
						<div className={inputContainerClasses}>
							<input
								id="donation-input"
								className={inputCss}
								type="text"
								inputMode="decimal"
								value={cryptoAmount ? cryptoAmount : undefined}
								onInput={(event) => {
									setCryptoAmount(Number(event.currentTarget.value));
									setSubmitError(null);
								}}
							/>
							<span>{cryptoCurrency}</span>
						</div>
					</div>
				</fieldset>
				<SubmitButton disabled={!cryptoAmount || !cryptoCurrency}>
					Next
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
