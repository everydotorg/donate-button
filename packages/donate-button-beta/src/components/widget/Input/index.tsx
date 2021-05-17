import cxs from 'cxs';
import {StateUpdater, useRef} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import chevronDown from 'src/assets/chevron-down.svg';
import { CurrencySuggestion } from 'src/components/widget/CurrencySuggestion';
import {Link} from 'src/components/widget/Link';
import {Popover} from 'src/components/widget/Popover';
import {supportedCurrencies} from 'src/components/widget/constants/supported-currencies';
import {COLORS} from 'src/components/widget/theme/colors.enum';
import {Currency} from 'src/components/widget/types/currency';

const preventDecimal = (
	event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>
) => {
	if (event.key === '.') {
		event.preventDefault();
	}
};

const inputContainerCss = cxs({
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	borderRadius: '8px',
	border: '1px solid',
	borderColor: COLORS.LightGray,
	':focus': {
		outline: 'none'
	},
	fontSize: '1rem',
	color: COLORS.Text,
	fontWeight: 'bold'
});

const inputErrorCss = cxs({
	border: '1px solid',
	borderColor: COLORS.Error,
	boxShadow: `0px 0px 0px 2px ${COLORS.ErrorShadow}`
});

const inputCss = cxs({
	border: 'none',
	margin: 0,
	fontFamily: 'inherit',
	borderTopLeftRadius: '8px',
	borderTopRightRadius: '8px',
	borderBottom: '1px solid transparent',
	backgroundColor: COLORS.Gray,
	width: '100%',
	padding: '1rem 4.5rem 1rem 2.5rem',
	outline: 'none',

	transition: 'all .4s',
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

const selectCurrencyCss = cxs({
	position: 'absolute',
	top: '50%',
	right: '1rem',
	transform: 'translateY(-50%)',
	lineHeight: 1,
	color: COLORS.Primary,

	// Select
	appearance: 'none',
	'-webkit-appearance': 'none',
	'-moz-appearance': 'none',
	border: 'none',
	background: 'transparent',
	fontFamily: 'inherit',
	outline: 'none',
	':focus': {
		outline: 'none'
	},

	backgroundImage: `url(${chevronDown})`,
	backgroundPositionX: 'right',
	backgroundPositionY: 'center',
	backgroundRepeat: 'no-repeat',

	paddingRight: '1rem'
});

const addAmountContainerCss = cxs({
	display: 'flex',
	marginTop: '1rem',
	'& > *:not(:last-child)': {
		marginRight: '1rem'
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
				<select
					className={selectCurrencyCss}
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
