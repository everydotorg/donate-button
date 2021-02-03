import './input.css';

const Input = ({
	value,
	setValue,
	extraClasses,
	label,
	placeholder,
	description,
	selected,
	...otherProps
}) => {
	const inputContainerClasses = ['input__container']
		.concat(extraClasses)
		.concat([selected ? 'input--selected' : ''])
		.concat(value ? ['input--filled'] : []);
	const inputClasses = ['t-input', 'input__input'];
	return (
		<div className={inputContainerClasses.join(' ')}>
			<div className="input">
				<span className="t-input input__prefix no-line-height">$</span>
				<input
					className={inputClasses.join(' ')}
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
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
