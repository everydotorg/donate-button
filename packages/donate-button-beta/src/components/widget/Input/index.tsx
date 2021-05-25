import cxs from 'cxs';
import {StateUpdater, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import chevronDown from 'src/assets/chevron-down.svg';
import {CurrencySuggestion} from 'src/components/widget/CurrencySuggestion';
import {Link} from 'src/components/widget/Link';
import {supportedCurrencies} from 'src/components/widget/constants/supported-currencies';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Currency} from 'src/components/widget/types/currency';

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
	borderTopLeftRadius: Radii.Default,
	borderTopRightRadius: Radii.Default,
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

const selectCurrencyContainerCss = cxs({
	position: 'absolute',
	top: '50%',
	right: Spacing.M,
	transform: 'translateY(-50%)',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer'
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
	marginTop: Spacing.M,
	'& > *:not(:last-child)': {
		marginRight: Spacing.M
	}
});

const addAmounts = [10, 25, 50, 100];

interface InputProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {
	value: number;
	setValue: StateUpdater<number>;
	setCurrency: StateUpdater<Currency>;
	error?: string;
	setError?: (v: string) => void;
	label?: string;
	placeholder?: string;
	selectedCurrency: Currency;
}
export const Input = ({
	value,
	setValue,
	error,
	label,
	placeholder,
	selectedCurrency,
	setCurrency,
	...otherProps
}: InputProps) => {
	const {primaryColor} = useConfigContext();
	const inputContainerRef = useRef<HTMLDivElement>(null);
	const inputContainerClasses = [inputContainerCss].concat(
		error ? [inputErrorCss] : []
	);

	const inputClasses = [inputCss];

	return (
		<Fragment>
			<div ref={inputContainerRef} className={inputContainerClasses.join(' ')}>
				<CurrencySuggestion ref={inputContainerRef} />
				<span className={inputPrefix}>
					{supportedCurrencies[selectedCurrency]}
				</span>
				<input
					className={inputClasses.join(' ')}
					placeholder={placeholder}
					type="number"
					min="10"
					value={value}
					onKeyDown={preventDecimal}
					onInput={(event) => {
						setValue(Number.parseInt(event.currentTarget.value, 10));
					}}
					{...otherProps}
				/>
				<div className={selectCurrencyContainerCss}>
					<select
						className={selectCurrencyCss(primaryColor)}
						onChange={(event) => {
							setCurrency(event.currentTarget.value as Currency);
						}}
					>
						{Object.keys(supportedCurrencies).map((currency) => (
							<option
								key={currency}
								value={currency}
								selected={selectedCurrency === currency}
							>
								{currency}
							</option>
						))}
					</select>
					<ChevronDown className={selectArrowCss} color={primaryColor} />
				</div>
			</div>
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
