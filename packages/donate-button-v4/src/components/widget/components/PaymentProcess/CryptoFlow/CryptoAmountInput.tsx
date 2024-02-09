import {Big} from 'big.js';
import cxs from 'cxs';
import {useState, useRef, useEffect, useCallback} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {MAX_CRYPTO_DECIMALS_FOR_DISPLAY} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoSelector';
import {
	changeModeButtonCss,
	cryptoAmountInputColumns,
	cryptoAmountInputContainerCss,
	cryptoAmountInputFirstColumn,
	cryptoAmountInputSecondColumn
} from 'src/components/widget/components/PaymentProcess/CryptoFlow/styles';
import {
	donationAmountInputContainerErrorCss,
	donationAmountInputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {
	btnCss,
	btnDisabledCss,
	btnActiveColor
} from 'src/components/widget/components/PaymentProcess/SubmitButton/styles';
import {TextInput} from 'src/components/widget/components/TextInput';
import {
	textInputContainerCss,
	textInputCss
} from 'src/components/widget/components/TextInput/styles';
import useCoingeckoRate from 'src/components/widget/hooks/useCoingeckoRate';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {LoadingIcon} from 'src/components/widget/icons/LoadingIcon';
import {RepeatIcon} from 'src/components/widget/icons/RepeatIcon';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing, verticalStackCss} from 'src/components/widget/theme/spacing';
import {CryptoCurrencyConfig} from 'src/components/widget/types/Crypto';
import {displayCurrencyValue} from 'src/helpers/displayCurrencyValue';
import {getStepForCurrencyAmountInput} from 'src/helpers/getStepForCurrencyAmountInput';
import joinClassNames from 'src/helpers/joinClassNames';

interface CryptoAmountInputProps {
	cryptoTokenRate: number | null;
	cryptoTokenLoading: boolean;
}
export const CryptoAmountInput = ({
	cryptoTokenLoading,
	cryptoTokenRate
}: CryptoAmountInputProps) => {
	const [cryptoAmountString, setCryptoAmountString] = useState<string>('');
	const {
		cryptoAmount,
		setCryptoAmount,
		cryptoCurrency,
		submitError,
		setSubmitError
	} = useWidgetContext();

	const {primaryColor} = useConfigContext();
	const inputContainerClasses = joinClassNames([
		cryptoAmountInputContainerCss(primaryColor),
		...(submitError ? [donationAmountInputContainerErrorCss] : [])
	]);

	const [amountWarning, setAmountWarning] = useState<string | undefined>(
		undefined
	);
	const [isCryptoInput, setIsCryptoInput] = useState(true);

	const amountInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (cryptoCurrency && amountInputRef && amountInputRef.current) {
			amountInputRef.current.focus();
		}
	}, [cryptoCurrency]);

	const setDonationAmount = useCallback(
		(newAmount: string) => {
			const newAmountBig =
				newAmount && newAmount !== '' ? new Big(newAmount) : undefined;
			if (isCryptoInput) {
				setCryptoAmountString(newAmountBig?.toString() ?? '');
				setCryptoAmount(newAmountBig?.toNumber() ?? 0);
			} else {
				const usdAmountBig =
					newAmountBig && cryptoTokenRate
						? newAmountBig
								.div(cryptoTokenRate)
								.round(MAX_CRYPTO_DECIMALS_FOR_DISPLAY)
						: new Big(0);
				setCryptoAmountString(usdAmountBig.toString());
				setCryptoAmount(usdAmountBig.toNumber());
			}
		},
		[setCryptoAmount, isCryptoInput, cryptoTokenRate]
	);

	const amountValue =
		cryptoTokenRate &&
		cryptoAmount &&
		new Big(cryptoAmount).times(cryptoTokenRate).round(2).toString();

	useEffect(() => {
		if (!amountWarning) {
			return;
		}

		const timer = setTimeout(() => {
			setAmountWarning(undefined);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [amountWarning]);

	const onAmountChanged = useCallback(
		(stringValue: string) => {
			setAmountWarning(undefined);
			if (stringValue === '') {
				setDonationAmount('');
				return false;
			}

			setAmountWarning(undefined);
			try {
				const bigValue = new Big(stringValue);
				if (bigValue.lt(0)) {
					return false;
				}

				if (bigValue.gt(Number.MAX_SAFE_INTEGER)) {
					setAmountWarning('Amount is too large');
					return false;
				}
			} catch {
				return false;
			}

			setDonationAmount(stringValue);
			return true;
		},
		[setDonationAmount]
	);

	const zeroRate = cryptoTokenRate === 0;

	return (
		<div className={inputContainerClasses}>
			<div className={cryptoAmountInputColumns}>
				<div className={cryptoAmountInputFirstColumn}>
					<input
						ref={amountInputRef}
						className={textInputCss}
						value={isCryptoInput ? cryptoAmountString : amountValue ?? ''}
						type="text"
						pattern="[+-]?(\d*\.)?\d+"
						name="donateAmountInput"
						id="donateAmountInput"
						inputMode="decimal"
						onChange={(event) => onAmountChanged(event.currentTarget.value)}
					/>
					{!zeroRate && (
						<div className={cxs({color: COLORS.TextGray})}>
							{cryptoTokenRate === null && cryptoTokenLoading ? (
								<LoadingIcon size={16} />
							) : isCryptoInput ? (
								displayCurrencyValue(amountValue ?? 0, 'USD', {
									showCurrency: false
								})
							) : (
								cryptoAmount ?? 0
							)}
						</div>
					)}
				</div>
				<div className={cryptoAmountInputSecondColumn}>
					<div>{isCryptoInput ? cryptoCurrency : 'USD'}</div>
					{!zeroRate && (
						<div className={cxs({color: COLORS.TextGray})}>
							{isCryptoInput ? 'USD' : cryptoCurrency}*
						</div>
					)}
				</div>
			</div>
			{!zeroRate && (
				<button
					className={changeModeButtonCss}
					type="button"
					disabled={cryptoTokenRate === undefined}
					onClick={() => {
						setIsCryptoInput(!isCryptoInput);
					}}
				>
					<RepeatIcon />
				</button>
			)}
		</div>
	);
};
