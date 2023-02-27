import cxs from 'cxs';
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

	const inputContainerClasses = [inputContainerCss(primaryColor)]
		.concat(submitError ? [inputContainerErrorCss] : [])
		.join(' ');

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
						<div className={inputContainerClasses}>
							<input
								id="stock-amount-input"
								className={inputCss}
								type="text"
								value={stockSymbol}
								onInput={(event) => {
									setStockSymbol(event.currentTarget.value);
									setSubmitError(null);
								}}
							/>
						</div>
					</div>
					<div>
						<legend className={legendCss}>
							How many shares are you donating?
						</legend>
						<div className={inputContainerClasses}>
							<input
								id="donation-input"
								className={inputCss}
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
					</div>
				</fieldset>
				<SubmitButton disabled={!stockAmount || !stockSymbol}>
					Next
				</SubmitButton>
				<RedirectNotice />
			</div>
		</form>
	);
};
