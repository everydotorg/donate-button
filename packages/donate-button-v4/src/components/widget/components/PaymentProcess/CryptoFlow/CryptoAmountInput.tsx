import {JSXInternal} from 'preact/src/jsx';
import {cryptoAmountInputContainerCss} from 'src/components/widget/components/PaymentProcess/CryptoFlow/styles';
import {
	donationAmountInputContainerErrorCss,
	donationAmountInputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {TextInput} from 'src/components/widget/components/TextInput';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {getStepForCurrencyAmountInput} from 'src/helpers/getStepForCurrencyAmountInput';
import joinClassNames from 'src/helpers/joinClassNames';

export const CryptoAmountInput = () => {
	const {primaryColor} = useConfigContext();

	const {
		cryptoAmount,
		setCryptoAmount,
		cryptoCurrency,
		submitError,
		setSubmitError
	} = useWidgetContext();

	const inputContainerClasses = joinClassNames([
		cryptoAmountInputContainerCss,
		...(submitError ? [donationAmountInputContainerErrorCss] : [])
	]);

	const onAmountInput = (
		event: JSXInternal.TargetedEvent<HTMLInputElement>
	) => {
		const stringValue = event.currentTarget.value;
		if (stringValue === '') {
			event.currentTarget.value = stringValue;
			setCryptoAmount(undefined);
		}

		const floatValue = Number.parseFloat(stringValue);

		if (Number.isNaN(floatValue) || !/[+-]?(\d*\.)?\d+/g.test(stringValue)) {
			return;
		}

		setCryptoAmount(floatValue);
		setSubmitError(null);
	};

	return (
		<div className={inputContainerClasses}>
			<TextInput
				id="donation-input"
				inputClassName={donationAmountInputCss}
				containerClassName={inputContainerClasses}
				type="number"
				inputMode="decimal"
				pattern="[+-]?(\d*\.)?\d+"
				step={getStepForCurrencyAmountInput(cryptoCurrency)}
				value={cryptoAmount}
				sufix={<span>{cryptoCurrency}</span>}
				onInput={onAmountInput}
			/>
		</div>
	);
};
