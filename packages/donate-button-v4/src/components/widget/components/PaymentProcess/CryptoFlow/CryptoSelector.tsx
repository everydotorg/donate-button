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
	donationAmountInputContainerErrorCss,
	donationAmountInputCss
} from 'src/components/widget/components/PaymentProcess/DonationAmount/styles';
import {TextInput} from 'src/components/widget/components/TextInput';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
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
import {CRYPTO_EMAIL} from 'src/constants/url';
import css from 'src/helpers/css';
import joinClassNames from 'src/helpers/joinClassNames';
import {mailToLink} from 'src/helpers/mailToLink';

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

const quickSelectTokens = new Set([
	CryptoCurrency.BTC,
	CryptoCurrency.ETH,
	CryptoCurrency.USDC
]);

const enabledCryptoCurrencyOptions: CryptoCurrencyOption[] = [];
const quickSelectOptions: CryptoCurrencyOption[] = [];
const otherOptions: CryptoCurrencyOption[] = [];

Object.values(CryptoCurrency).forEach((value) => {
	const option = cryptoCurrencyToOption(value);
	if (!DISABLED_TOKENS.includes(value)) {
		enabledCryptoCurrencyOptions.push(option);

		if (quickSelectTokens.has(value)) {
			quickSelectOptions.push(option);
		} else {
			otherOptions.push(option);
		}
	}
});

export const MAX_CRYPTO_DECIMALS_FOR_DISPLAY = 7;

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

const CryptoSupprotLink = () => {
	const nonprofit = useNonprofitOrError();

	const {primaryColor} = useConfigContext();
	const cryptoSupportBody = `Contents: I would like to make a crypto donation to support https://www.every.org/${nonprofit.primarySlug}.\n\nMy name:\nToken name:\nToken symbol:\nToken quantity:\n\nPlease reply back with an address where I can donate, as this is worth over $5,000 USD.`;

	return (
		<a
			className={linkCss(primaryColor)}
			href={mailToLink({
				address: CRYPTO_EMAIL,
				subject: `Crypto donation for ${nonprofit.name}`,
				body: cryptoSupportBody
			})}
		>
			{CRYPTO_EMAIL}
		</a>
	);
};

export const CryptoSelector = () => {
	const {submitError, cryptoCurrency, setCryptoCurrency} = useWidgetContext();
	const {primaryColor} = useConfigContext();

	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedOption, setSelectedOption] = useState<
		CryptoCurrencyOption | undefined
	>(
		enabledCryptoCurrencyOptions.find(
			(option) => option.value === cryptoCurrency
		)
	);

	const [inputValue, setInputValue] = useState(selectedOption?.label);

	const [showDropDown, setShowDrowDown] = useState(!selectedOption);

	const handleItemClick = (option: CryptoCurrencyOption) => {
		setSelectedOption(option);
		setCryptoCurrency(option.value);
		setInputValue(option.label);
		setShowDrowDown(false);
	};

	const handleInputFocus = () => {
		setSelectedOption(undefined);
		setCryptoCurrency(undefined);
		setShowDrowDown(true);
		setInputValue('');
	};

	const handleInput = (value: string) => {
		setInputValue(value);
		setSelectedOption(undefined);
		setCryptoCurrency(undefined);
		setShowDrowDown(true);
	};

	const handleContainerClick = () => {
		inputRef.current?.focus();
		handleInputFocus();
	};

	const inputContainerClasses = joinClassNames([
		cryptoSelectorInputContainerCss,
		...(submitError ? [donationAmountInputContainerErrorCss] : []),
		...(showDropDown ? [inputContainerWithDropDownCss] : [])
	]);

	const optionToListItem = (option: CryptoCurrencyOption) => (
		<CryptoSelectorDropDownItem option={option} onClick={handleItemClick} />
	);

	const filteredOptions = inputValue
		? fuzzyFilter(inputValue, enabledCryptoCurrencyOptions, {
				extract: (option) => {
					const config = SharedCryptoCurrencyConfig[option.value];
					return [config.displayName, config.abbreviation].join(' ');
				}
		  }).map((element) => element.original)
		: undefined;

	return (
		<div className={cryptoSelectorContainerCss}>
			<TextInput
				ref={inputRef}
				inputClassName={donationAmountInputCss}
				containerOnClick={handleContainerClick}
				value={inputValue}
				prefix={
					selectedOption ? (
						<CryptoCurrencyIcon currency={selectedOption.value} />
					) : (
						<SearchIcon />
					)
				}
				prefixClassName={css({display: 'inline-flex'})}
				sufixClassName={cryptoSelectorInputSufixCss(primaryColor, showDropDown)}
				containerClassName={inputContainerClasses}
				sufix={
					<Fragment>
						<span>{selectedOption?.contractType}</span> <ArrowIcon />
					</Fragment>
				}
				onInput={(event) => {
					handleInput(event.currentTarget.value);
				}}
				onFocus={handleInputFocus}
			/>
			{showDropDown && (
				<div className={cryptoSelectorDropDownContainerCss}>
					<div className={cryptoSelectorDropDownContentCss}>
						{filteredOptions ? (
							filteredOptions.length === 0 ? (
								<div className={css({padding: '20px'})}>
									We don&apos;t currently support this coin on our site, but for
									donations worth over $5,000 USD we can do it manually. Please
									email <CryptoSupprotLink /> to arrange.
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
