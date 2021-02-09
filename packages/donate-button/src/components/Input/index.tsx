import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import 'src/components/Input/input.css';

const preventDecimal = (event: JSXInternal.TargetedEvent<HTMLInputElement, KeyboardEvent>) => {
	if(event.key==='.'){
		event.preventDefault()
	}
}

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
	setError,
	extraClasses,
	label,
	placeholder,
	description,
	selected,
	...otherProps
}: InputProps) => {

	useEffect(() => {
		const timeout = setTimeout(() => {
			if(value && +value < 10) {
				setError('The minimum amount is 10')
				return
			} 
		}, 200)

		if(+value >= 10){
			setError('')
	}

		return () => clearTimeout(timeout)
	}, [value])

	const inputContainerClasses = ['input__container']
		.concat(extraClasses)
		.concat([selected ? 'input--selected' : ''])
		.concat(value ? ['input--filled'] : [])
		.concat(error ? ['input--error']: [])

	const inputClasses = ['t-input', 'input__input'];

	return (
		<Fragment>
			<div className={inputContainerClasses.join(' ')}>
				<div className="input">
					<span className="t-input input__prefix no-line-height">$</span>
					<input
						className={inputClasses.join(' ')}
						placeholder={placeholder}
						type="number"
						min="10"
						onKeyDown={preventDecimal}
						value={value}
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
		</Fragment>
	);
};

export default Input;
