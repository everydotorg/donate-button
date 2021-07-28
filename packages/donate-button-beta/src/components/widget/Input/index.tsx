import cxs from 'cxs';
import {StateUpdater, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import {Link} from 'src/components/widget/Link';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText, smallText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

const preventDecimal = (
	event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>
) => {
	if (event.key === '.') {
		event.preventDefault();
	}
};

const inputContainerCss = cxs({
	...linkText,
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	borderRadius: Radii.Default,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	':focus': {
		outline: 'none'
	},
	color: COLORS.Text,
	fontWeight: 'bold'
});

const inputErrorCss = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.Error),
	boxShadow: `0px 0px 0px 2px ${COLORS.ErrorShadow}`
});

const inputCss = cxs({
	fontSize: '1.5rem',
	border: 'none',
	margin: 0,
	fontFamily: 'inherit',
	borderRadius: Radii.Default,
	borderBottom: getColoredBorder(Borders.Normal, COLORS.Transparent),
	backgroundColor: COLORS.Gray,
	width: '100%',
	padding: '0.75rem 4.5rem 0.75rem 2.5rem',
	outline: 'none',
	'::placeholder': {
		opacity: '0.4',
		fontWeight: 500
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

const inputPrefix = cxs({
	fontSize: '1.5rem',
	position: 'absolute',
	top: '50%',
	left: '0.75rem',
	opacity: '0.4',
	fontWeight: 500,
	transform: 'translateY(-50%)',
	lineHeight: 1,
	color: COLORS.TextGray
});

const selectCurrencyContainerCss = (clickable: boolean) =>
	cxs({
		position: 'absolute',
		top: '50%',
		right: Spacing.M,
		transform: 'translateY(-50%)',
		display: 'flex',
		alignItems: 'center',
		cursor: clickable ? 'pointer' : 'default'
	});

const currencySelected = (primaryColor: string) =>
	cxs({
		lineHeight: 1,
		color: primaryColor,
		margin: 0,
		fontWeight: 400
	});

const selectCurrencyCss = (primaryColor: string) =>
	cxs({
		lineHeight: 1,
		color: primaryColor,

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
		},

		paddingRight: Spacing.L
	});

const selectArrowCss = cxs({
	marginLeft: `-${Spacing.M}`,
	pointerEvents: 'none'
});

const addAmountContainerCss = cxs({
	display: 'flex',
	marginTop: Spacing.XS,
	'& > *:not(:last-child)': {
		marginRight: Spacing.M
	}
});

const errorLabelCss = cxs({
	...smallText,
	lineHeight: 1,
	fontSize: '0.75rem',
	opacity: 0.8,
	color: COLORS.Error,
	marginTop: Spacing.XS,
	marginBottom: 0
});

// The minimum donation amount for HKD is 50 - until we support dynamic
// suggested amounts depending on the currency, start at 50 for all.
const addAmounts = [50, 100, 200, 500];

interface InputProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {
	value?: number;
	setValue: StateUpdater<number | undefined>;
	setCurrency: StateUpdater<CurrencyOption>;
	setCountry: StateUpdater<DonationRecipient>;
	error: string | null;
	setError: StateUpdater<string | null>;
	label?: string;
	selectedCurrency: CurrencyOption;
}

export const Input = ({
	value,
	setValue,
	error,
	setError,
	label,
	selectedCurrency,
	setCurrency,
	setCountry,
	...otherProps
}: InputProps) => {
	const {primaryColor, currencies, countries} = useConfigContext();
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const inputContainerClasses = [inputContainerCss].concat(
		error ? [inputErrorCss] : []
	);
	const i18n = useI18n();

	const inputClasses = [inputCss];

	const handleInputChange = (
		event: JSXInternal.TargetedEvent<HTMLInputElement>
	) => {
		const value = Number.parseInt(event.currentTarget.value, 10);

		setValue(value);

		if (value >= 10) {
			setError(null);
		}
	};

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
		<Fragment>
			<div ref={inputContainerRef} className={inputContainerClasses.join(' ')}>
				<span className={inputPrefix}>{selectedCurrency?.symbol}</span>
				<input
					className={inputClasses.join(' ')}
					placeholder={i18n.enterAnAmount}
					type="number"
					value={value}
					onKeyDown={preventDecimal}
					onInput={handleInputChange}
					{...otherProps}
				/>
				<div className={selectCurrencyContainerCss(currencies.length > 1)}>
					{currencies.length > 1 ? (
						<Fragment>
							<select
								className={selectCurrencyCss(primaryColor)}
								onChange={selectCurrency}
							>
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
							<ChevronDown className={selectArrowCss} color={primaryColor} />
						</Fragment>
					) : (
						<p className={currencySelected(primaryColor)}>
							{selectedCurrency.name}
						</p>
					)}
				</div>
			</div>
			<p className={errorLabelCss}>{error}&nbsp;</p>
			<div className={addAmountContainerCss}>
				{addAmounts.map((amount) => (
					<Link
						key={amount}
						label={`+${amount}`}
						onClick={() => {
							setValue((previous) => (previous ?? 0) + amount);
						}}
					/>
				))}
			</div>
		</Fragment>
	);
};
