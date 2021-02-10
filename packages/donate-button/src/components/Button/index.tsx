import {ComponentChildren} from 'preact';
import 'src/components/Button/index.css';

interface ButtonProps {
	handleClick: () => void;
	extraClasses?: string[];
	children: ComponentChildren;
	disabled?: boolean;
}
const Button = ({
	handleClick,
	extraClasses = [],
	disabled = false,
	children
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={['btn']
				.concat(disabled ? ['btn--disabled'] : [])
				.concat(extraClasses)
				.join(' ')}
			disabled={disabled}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
