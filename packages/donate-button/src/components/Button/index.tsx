import {ComponentChildren} from 'preact';
import 'src/components/Button/index.css';

interface ButtonProps {
	handleClick: () => void;
	extraClasses?: string[];
	children: ComponentChildren;
}
const Button = ({handleClick, extraClasses = [], children}: ButtonProps) => {
	return (
		<button
			type="button"
			className={['btn'].concat(extraClasses).join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
