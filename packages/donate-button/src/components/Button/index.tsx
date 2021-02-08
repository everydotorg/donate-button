import {ComponentChildren} from 'preact';
import 'src/components/Button/index.css';

interface ButtonProps {
	handleClick: () => void;
	extraClasses?: string[];
	children: ComponentChildren;
}
function Button({handleClick, extraClasses = [], children}: ButtonProps) {
	return (
		<button
			className={['btn'].concat(extraClasses).join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	);
}

export default Button;
