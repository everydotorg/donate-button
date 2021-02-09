import {JSX} from 'preact/jsx-runtime';
import 'src/components/RadioButton/radio-button.css';

interface RadioButtonProps {
	name: string;
	text?: string;
	amount: string;
	selected: boolean;
	handleClick: () => void;
	description?: string | JSX.Element;
	image?: string;
	bgColor?: string;
}
const RadioButton = ({
	name,
	text,
	amount,
	selected,
	handleClick,
	description,
	image,
	bgColor
}: RadioButtonProps) => {
	const groupClasses = ['radio-button'];
	if (selected) {
		groupClasses.push('radio-button--selected');
	}

	const labelClasses = ['radio-button__label'].concat([
		text ? 'u-justify-content-space-between' : 'u-justify-content-center'
	]);

	return (
		<div className={groupClasses.join(' ')}>
			<input
				className="radio-button__input"
				type="radio"
				name={name}
				id={amount}
				onClick={handleClick}
			/>
			<label className={labelClasses.join(' ')} htmlFor={amount}>
				{text && <span className="t-label radio-button__text">{text}</span>}
				<span className="t-label radio-button__amount">${amount}</span>
			</label>
			{text && description && (
				<div style={{backgroundColor: bgColor}} className="radio-button__extra">
					<div className="radio-button__img-container">
						<img className="radio-button__image" src={image} alt={text} />
					</div>
					<p className="t-body radio-button__description">{description}</p>
				</div>
			)}
		</div>
	);
};

export default RadioButton;
