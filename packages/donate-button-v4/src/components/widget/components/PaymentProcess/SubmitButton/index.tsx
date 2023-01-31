import {ComponentChildren} from 'preact';
import {
	btnCss,
	btnDisabledCss,
	btnActiveColor
} from 'src/components/widget/components/PaymentProcess/SubmitButton/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import joinClassNames from 'src/helpers/joinClassNames';

interface ButtonProps {
	handleClick?: () => void;
	children: ComponentChildren;
	disabled?: boolean;
}

export const SubmitButton = ({
	handleClick,
	disabled,
	children
}: ButtonProps) => {
	const {primaryColor} = useConfigContext();

	return (
		<button
			type="submit"
			className={joinClassNames([
				btnCss,
				disabled ? btnDisabledCss : btnActiveColor(primaryColor)
			])}
			disabled={disabled}
			onClick={handleClick}
		>
			<span>{children}</span>
		</button>
	);
};
