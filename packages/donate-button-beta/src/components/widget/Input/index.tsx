import cxs from 'cxs';
import {StateUpdater, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import {CurrencySuggestion} from 'src/components/widget/CurrencySuggestion';
import {Link} from 'src/components/widget/Link';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText, smallText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {CurrencyOption} from 'src/components/widget/types/currency-option';

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
	border: 'none',
	margin: 0,
	fontFamily: 'inherit',
	fontSize: 'inherit',
	borderRadius: Radii.Default,
	borderBottom: getColoredBorder(Borders.Normal, COLORS.Transparent),
	backgroundColor: COLORS.Gray,
	width: '100%',
	padding: '1rem 4.5rem 1rem 2.5rem',
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

const addAmounts = [10, 25, 50, 100];

interface InputProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {
	value: number;
	setValue: StateUpdater<number>;
	setCurrency: StateUpdater<CurrencyOption>;
	error: string | null;
	setError: StateUpdater<string | null>;
	label?: string;
	placeholder?: string;
	selectedCurrency: CurrencyOption;
}

export const Input = ({
	value,
	setValue,
	error,
	setError,
	label,
	placeholder,
	selectedCurrency,
	setCurrency,
	...otherProps
}: InputProps) => {
	const {primaryColor, currencies} = useConfigContext();
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const inputContainerClasses = [inputContainerCss].concat(
		error ? [inputErrorCss] : []
	);

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

	return (
		<Fragment>
			<div ref={inputContainerRef} className={inputContainerClasses.join(' ')}>
				<CurrencySuggestion ref={inputContainerRef} />
				<span className={inputPrefix}>{selectedCurrency?.symbol}</span>
				<input
					className={inputClasses.join(' ')}
					placeholder={placeholder}
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
								onChange={(event) => {
									setCurrency(
										currencies.find(
											(c) => c.name === event.currentTarget.value
										)!
									);
								}}
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
							setValue((previous) => previous + amount);
						}}
					/>
				))}
			</div>
		</Fragment>
	);
};
