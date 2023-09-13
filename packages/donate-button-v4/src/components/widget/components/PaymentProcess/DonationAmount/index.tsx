import cxs from 'cxs';
import {useEffect, useRef} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {
	donationAmountAddAmountButtonCss,
	donationAmountAddAmountContainerCss,
	donationAmountInputPrefixCss,
	donationAmountInputSufixCss,
	donationAmountInputContainerErrorCss,
	donationAmountInputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {
	fieldSetCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {TextInput} from 'src/components/widget/components/TextInput';
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

const abbreviateNumber = (n: number, significantDigits?: number): string => {
	if (n < 1e3) {
		return n.toString();
	}

	let symbol = '';
	let denom = 1;
	if (n >= 1e3 && n < 1e6) {
		denom = 1e3;
		symbol = 'k';
	} else if (n >= 1e6 && n < 1e9) {
		denom = 1e6;
		symbol = 'm';
	} else if (n >= 1e9 && n < 1e12) {
		denom = 1e9;
		symbol = 'b';
	} else if (n >= 1e12) {
		denom = 1e12;
		symbol = 't';
	}

	if (significantDigits === undefined) {
		return (n / denom).toFixed(3).replace(/\.?0+$/, '') + symbol;
	}

	return (n / denom).toFixed(significantDigits) + symbol;
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

	return (
		<fieldset
			className={cxs({fieldSetCss, ...verticalStackCss.cxs(Spacing.S)})}
		>
			<legend className={legendCss}>Donation amount</legend>
			<TextInput
				ref={inputRef}
				id="donation-input"
				type="number"
				pattern="[0-9]*"
				inputMode="numeric"
				min={0}
				step={1}
				value={donationAmount ? donationAmount : undefined}
				prefix={DEFAULT_CURRENCY.symbol}
				inputClassName={donationAmountInputCss}
				prefixClassName={donationAmountInputPrefixCss}
				sufix={DEFAULT_CURRENCY.name}
				sufixClassName={donationAmountInputSufixCss(primaryColor)}
				containerClassName={
					submitError ? donationAmountInputContainerErrorCss : undefined
				}
				onKeyDown={preventDecimal}
				onInput={(event) => {
					setDonationAmount(Number(event.currentTarget.value));
					setSubmitError(null);
				}}
			/>
			{addAmounts && addAmounts.length > 0 && (
				<div className={donationAmountAddAmountContainerCss}>
					{addAmounts.map((amount) => (
						<button
							key={amount}
							className={donationAmountAddAmountButtonCss(primaryColor)}
							type="button"
							onClick={() => {
								setDonationAmount((previous) => {
									return typeof previous === 'number'
										? previous + amount
										: amount;
								});
							}}
						>
							+{abbreviateNumber(amount)}
						</button>
					))}
				</div>
			)}
		</fieldset>
	);
};
