import {useEffect, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import 'src/components/Input/input.css';

const preventDecimal = (
	event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>
) => {
	if (event.key === '.') {
		event.preventDefault();
	}
};

interface InputProps extends JSXInternal.HTMLAttributes<HTMLInputElement> {
	value: string;
	setValue: (v: string) => void;
	error: string;
	setError: (v: string) => void;
	extraClasses: string[];
	label?: string;
	placeholder?: string;
	description?: string;
	selected: boolean;
}
const Input = ({
	value,
	setValue,
	error,
	extraClasses,
	label,
	placeholder,
	description,
	selected,
	...otherProps
}: InputProps) => {
	const inputContainerClasses = ['input__container']
		.concat(extraClasses)
		.concat([selected ? 'input--selected' : ''])
		.concat(value ? ['input--filled'] : [])
		.concat(error ? ['input--error'] : []);

	const inputClasses = ['t-input', 'input__input'];

	return (
		<div className={inputContainerClasses.join(' ')}>
			<div className="input">
				<span className="t-input input__prefix no-line-height">$</span>
				<input
					className={inputClasses.join(' ')}
					placeholder={placeholder}
					type="number"
					min="10"
					value={value}
					onKeyDown={preventDecimal}
					onInput={(event) => {
						setValue(event.currentTarget.value);
					}}
					{...otherProps}
				/>
				{label && (
					<span className="t-input input__suffix no-line-height">{label}</span>
				)}
			</div>
			{description && (
				<p className="t-body input__description">{description}</p>
			)}
		</div>
	);
};

export default Input;
