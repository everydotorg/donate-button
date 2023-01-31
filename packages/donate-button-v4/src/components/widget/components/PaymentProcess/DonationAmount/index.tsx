import cxs from 'cxs';
import {useEffect, useRef} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {
	addAmountButtonCss,
	addAmountContainerCss,
	inputPrefixCss,
	inputSufixCss,
	inputContainerCss,
	inputContainerErrorCss,
	inputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {
	fieldSetCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import {DEFAULT_CURRENCY} from 'src/constants/currency';
import {isTouchDevice} from 'src/helpers/isTouchDevice';

const preventDecimal = (
	event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>
) => {
	if (event.key === '.') {
		event.preventDefault();
	}
};

export const DonationAmount = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const {primaryColor, addAmounts} = useConfigContext();

	const {setDonationAmount, donationAmount, setSubmitError, submitError} =
		useWidgetContext();

	const autoFocusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		if (!isTouchDevice()) {
			autoFocusInput();
		}
	}, []);

	const inputContainerClasses = [inputContainerCss(primaryColor)]
		.concat(submitError ? [inputContainerErrorCss] : [])
		.join(' ');

	return (
		<fieldset
			className={cxs({fieldSetCss, ...verticalStackCss.cxs(Spacing.S)})}
		>
			<legend className={legendCss}>Donation amount</legend>
			<div className={inputContainerClasses}>
				<span className={inputPrefixCss}>{DEFAULT_CURRENCY.symbol}</span>
				<input
					ref={inputRef}
					id="donation-input"
					className={inputCss}
					type="number"
					pattern="[0-9]*"
					inputMode="numeric"
					min={0}
					step={1}
					value={donationAmount ? donationAmount : undefined}
					onKeyDown={preventDecimal}
					onInput={(event) => {
						setDonationAmount(Number(event.currentTarget.value));
						setSubmitError(null);
					}}
				/>
				<span className={inputSufixCss(primaryColor)}>
					{DEFAULT_CURRENCY.name}
				</span>
			</div>
			{addAmounts && addAmounts.length > 0 && (
				<div className={addAmountContainerCss}>
					{addAmounts.map((amount) => (
						<button
							key={amount}
							className={addAmountButtonCss(primaryColor)}
							type="button"
							onClick={() => {
								setDonationAmount((previous) => {
									return typeof previous === 'number'
										? previous + amount
										: amount;
								});
							}}
						>
							+{amount}
						</button>
					))}
				</div>
			)}
		</fieldset>
	);
};
