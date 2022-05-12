import cxs from 'cxs';
import {StateUpdater, useEffect, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import {FormControl} from 'src/components/widget/FormControl';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText, inputText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {isTouchDevice} from 'src/helpers/is-touch-device';

const preventDecimal = (
	event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>
) => {
	if (event.key === '.') {
		event.preventDefault();
	}
};

const inputContainerCss = (color: string) =>
	cxs({
		position: 'relative',
		height: '56px',
		padding: Spacing.XXS,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: Radii.Default,
		color: COLORS.Text,
		border: getColoredBorder(Borders.Normal, COLORS.LightGray),
		':focus-within': {
			borderColor: color
		}
	});

const inputContainerErrorCss = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.Error)
});

const inputCss = cxs({
	...inputText,
	fontFamily: 'inherit',
	fontWeight: 700,
	flex: 1,
	border: 'none',
	marginLeft: Spacing.XXL,
	outline: 'none',
	'::placeholder': {
		fontWeight: 400
	},
	'::-webkit-outer-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0
	},
	'::-webkit-inner-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0
	},
	'-moz-appearance': 'textfield'
});

const inputPrefixContainerCss = cxs({
	...inputText,
	fontFamily: 'inherit',
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	top: 0,
	bottom: 0,
	pointerEvents: 'none',
	color: COLORS.TextGray,
	fontWeight: 400,
	marginLeft: Spacing.S
});

const selectCurrencyContainerCss = (clickable: boolean) =>
	cxs({
		display: 'flex',
		alignItems: 'center',
		marginRight: Spacing.S,
		cursor: clickable ? 'pointer' : 'unset'
	});

const currencySelected = cxs({
	...bodyText,
	color: COLORS.Text
});

const selectCurrencyCss = cxs({
	...bodyText,
	paddingRight: Spacing.L,
	cursor: 'pointer',
	height: '100%',
	color: COLORS.Text,

	// Select
	appearance: 'none',
	'-webkit-appearance': 'none',
	'-moz-appearance': 'none',
	border: 'none',
	background: COLORS.Transparent,
	fontFamily: 'inherit',
	outline: 'none',
	':focus': {
		outline: 'none'
	}
});

const selectArrowCss = cxs({
	right: Spacing.M,
	position: 'absolute',
	pointerEvents: 'none'
});

const addAmountContainerCss = cxs({
	display: 'flex',
	marginTop: Spacing.XS,
	'& > *:not(:last-child)': {
		marginRight: Spacing.XXS
	}
});

const addAmountButtonCss = (color: string) =>
	cxs({
		border: 'none',
		height: '32px',
		backgroundColor: COLORS.Gray,
		color: COLORS.Text,
		borderRadius: Radii.Default,
		padding: `0 ${Spacing.S}`,
		fontSize: '14px',
		fontFamily: 'inherit',
		cursor: 'pointer',
		transition: 'background .3s, color .3s',
		':hover': {
			backgroundColor: color,
			color: COLORS.White
		}
	});

interface InputProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {
	value?: number;
	setValue: StateUpdater<number | undefined>;
	setCurrency: StateUpdater<CurrencyOption>;
	setCountry: StateUpdater<DonationRecipient>;
	error: string | null;
	setError: StateUpdater<string | null>;
	selectedCurrency: CurrencyOption;
}

export const Input = ({
	value,
	setValue,
	error,
	setError,
	selectedCurrency,
	setCurrency,
	setCountry,
	autoFocus,
	...otherProps
}: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {primaryColor, currencies, countries, showInputButtons, addAmounts} =
		useConfigContext();
	const i18n = useI18n();

	const autoFocusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		if (autoFocus && !isTouchDevice()) {
			autoFocusInput();
		}
	}, [autoFocus]);

	const inputContainerClasses = [inputContainerCss(primaryColor)]
		.concat(error ? [inputContainerErrorCss] : [])
		.join(' ');

	const selectCurrency = (
		event: JSXInternal.TargetedEvent<HTMLSelectElement>
	) => {
		const currency = currencies.find(
			(c) => c.name === event.currentTarget.value
		);
		if (currency) {
			const country = countries.find((country) =>
				currency.countryCodes.includes(country.countryCode)
			);

			if (country) {
				setCountry(country);
			}

			setCurrency(currency);
		}
	};

	return (
		<FormControl label={error ?? i18n.amount} isError={Boolean(error)}>
			<div className={inputContainerClasses}>
				<div className={inputPrefixContainerCss}>
					<span>{selectedCurrency?.symbol}</span>
				</div>

				<input
					ref={inputRef}
					id="donation-input"
					className={inputCss}
					placeholder={i18n.enterAnAmount}
					type="number"
					pattern="[0-9]*"
					inputMode="numeric"
					min={0}
					step={1}
					value={value ? value : undefined}
					onKeyDown={preventDecimal}
					onInput={(event) => {
						setValue(Number(event.currentTarget.value));
						setError(null);
					}}
					{...otherProps}
				/>

				<div className={selectCurrencyContainerCss(currencies.length > 1)}>
					{currencies.length > 1 ? (
						<Fragment>
							<select className={selectCurrencyCss} onChange={selectCurrency}>
								{currencies.map((currency) => (
									<option
										key={currency}
										value={currency.name}
										selected={selectedCurrency?.name === currency.name}
									>
										{currency.name}
									</option>
								))}
							</select>

							<ChevronDown classes={[selectArrowCss]} color={primaryColor} />
						</Fragment>
					) : (
						<p className={currencySelected}>{selectedCurrency.name}</p>
					)}
				</div>
			</div>

			{showInputButtons && (
				<div className={addAmountContainerCss}>
					{(addAmounts ?? [50, 100, 200, 500]).map((amount) => (
						<button
							key={amount}
							className={addAmountButtonCss(primaryColor)}
							type="button"
							onClick={() => {
								setValue((previous) => {
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
		</FormControl>
	);
};
