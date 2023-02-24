import cxs from 'cxs';
import {filter as fuzzyFilter} from 'fuzzy';
import {useRef, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {linkCss} from 'src/components/widget/components/FundraiserLink/styles';
import {
	cryptoSelectorDropDownItemCss,
	cryptoSelectorInputContainerCss,
	inputContainerWithDropDownCss,
	cryptoSelectorContainerCss,
	cryptoSelectorInputSufixCss,
	cryptoSelectorDropDownContainerCss,
	cryptoSelectorDropDownContentCss,
	quickSelectOptionsListCss
} from 'src/components/widget/components/PaymentProcess/CryptoFlow/styles';
import {
	inputContainerCss,
	inputContainerErrorCss,
	inputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {ArrowIcon} from 'src/components/widget/icons/ArrowIcon';
import {CryptoCurrencyIcon} from 'src/components/widget/icons/CryptoCurrencyIcon';
import {SearchIcon} from 'src/components/widget/icons/SearchIcon';
import {
	CryptoCurrency,
	SharedCryptoCurrencyConfig,
	CryptoCurrencyOption,
	DISABLED_TOKENS
} from 'src/components/widget/types/Crypto';
import joinClassNames from 'src/helpers/joinClassNames';

export function displayLabelForCryptoCurrency(cc: CryptoCurrency) {
	const config = SharedCryptoCurrencyConfig[cc];
	return `${config.displayName} (${config.abbreviation})`;
}

export function displayContractTypeForCryptoCurrency(cc: CryptoCurrency) {
	const config = SharedCryptoCurrencyConfig[cc];
	return `${config.contractType ? `${config.contractType}` : ''}`;
}

function cryptoCurrencyToOption(cc: CryptoCurrency): CryptoCurrencyOption {
	return {
		value: cc,
		label: displayLabelForCryptoCurrency(cc),
		contractType: displayContractTypeForCryptoCurrency(cc)
	};
}

const quickSelectTokens = [
	CryptoCurrency.BTC,
	CryptoCurrency.ETH,
	CryptoCurrency.USDC
];

const quickSelectOptions = quickSelectTokens.map((value) =>
	cryptoCurrencyToOption(value)
);

const otherOptions = Object.values(CryptoCurrency)
	.filter((cc) => !quickSelectTokens.includes(cc))
	.filter((cc) => !DISABLED_TOKENS.includes(cc))
	.map((value) => cryptoCurrencyToOption(value));

const cryptoCurrencyOptions = Object.values(CryptoCurrency).map((value) =>
	cryptoCurrencyToOption(value)
);

export const MAX_CRYPTO_DECIMALS_FOR_DISPLAY = 7;

interface CryptoSelectorProps {
	value?: string;
	onChange: (value?: string) => void;
}

const CryptoSelectorDropDownItem = ({
	onClick,
	option
}: {
	onClick: (option: CryptoCurrencyOption) => void;
	option: CryptoCurrencyOption;
}) => (
	<li key={option.value} role="option">
		<button
			type="button"
			className={cryptoSelectorDropDownItemCss}
			onClick={() => {
				onClick(option);
			}}
		>
			<CryptoCurrencyIcon currency={option.value} />
			<span>{option.label}</span>
			<span>{option.contractType}</span>
		</button>
	</li>
);

export const CryptoSelector = ({value, onChange}: CryptoSelectorProps) => {
	const {submitError} = useWidgetContext();
	const {primaryColor} = useConfigContext();

	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedOption, setSelectedOption] = useState<
		CryptoCurrencyOption | undefined
	>(cryptoCurrencyOptions.find((option) => option.value === value));

	const [inputValue, setInputValue] = useState(selectedOption?.label);

	const [showDropDown, setShowDrowDown] = useState(!selectedOption);

	const handleItemClick = (option: CryptoCurrencyOption) => {
		setSelectedOption(option);
		onChange(option.value);
		setInputValue(option.label);
		setShowDrowDown(false);
	};

	const handleInputFocus = () => {
		setSelectedOption(undefined);
		onChange(undefined);
		setShowDrowDown(true);
		setInputValue('');
	};

	const handleInput = (value: string) => {
		setInputValue(value);
		setSelectedOption(undefined);
		onChange(undefined);
		setShowDrowDown(true);
	};

	const handleContainerClick = () => {
		inputRef.current?.focus();
		handleInputFocus();
	};

	const inputContainerClasses = joinClassNames([
		inputContainerCss(primaryColor),
		cryptoSelectorInputContainerCss,
		...(submitError ? [inputContainerErrorCss] : []),
		...(showDropDown ? [inputContainerWithDropDownCss] : [])
	]);

	const optionToListItem = (option: CryptoCurrencyOption) => (
		<CryptoSelectorDropDownItem option={option} onClick={handleItemClick} />
	);

	const filteredOptions = inputValue
		? fuzzyFilter(inputValue, cryptoCurrencyOptions, {
				extract: (option) => {
					const config = SharedCryptoCurrencyConfig[option.value];
					return [config.displayName, config.abbreviation].join(' ');
				}
		  }).map((element) => element.original)
		: undefined;

	return (
		<div className={cryptoSelectorContainerCss}>
			<div className={inputContainerClasses} onClick={handleContainerClick}>
				{selectedOption ? (
					<CryptoCurrencyIcon currency={selectedOption.value} />
				) : (
					<SearchIcon />
				)}
				<input
					ref={inputRef}
					className={inputCss}
					value={inputValue}
					onInput={(event) => {
						handleInput(event.currentTarget.value);
					}}
					onFocus={handleInputFocus}
				/>
				<span
					className={cryptoSelectorInputSufixCss(primaryColor, showDropDown)}
				>
					<span>{selectedOption?.contractType}</span> <ArrowIcon />
				</span>
			</div>
			{showDropDown && (
				<div className={cryptoSelectorDropDownContainerCss}>
					<div className={cryptoSelectorDropDownContentCss}>
						{filteredOptions ? (
							filteredOptions.length === 0 ? (
								<div className={cxs({padding: '20px'})}>
									We don&apos;t currently support this coin on our site, but for
									donations worth over $5,000 USD we can do it manually. Please
									email{' '}
									<a
										className={linkCss(primaryColor)}
										href="mailto:crypto@every.org"
									>
										crypto@every.org
									</a>{' '}
									to arrange.
								</div>
							) : (
								<ul>
									{filteredOptions.map((option) => optionToListItem(option))}
								</ul>
							)
						) : (
							<Fragment>
								<ul className={quickSelectOptionsListCss}>
									{quickSelectOptions.map((option) => optionToListItem(option))}
								</ul>
								<ul>
									{otherOptions.map((option) => optionToListItem(option))}
								</ul>
							</Fragment>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
