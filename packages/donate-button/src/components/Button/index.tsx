import './button.css';

const Button = ({handleClick, extraClasses, children}) => {
	return (
		<button
			className={['btn'].concat(extraClasses).join(' ')}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
