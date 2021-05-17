import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {COLORS} from 'src/components/widget/theme/colors.enum';

const btnCss = cxs({
	border: '1px solid #fff',
	outline: 'none',
	width: '100%',

	fontFamily: 'inherit',
	fontSize: '1rem',
	fontWeight: 500,
	lineHeight: 1,

	cursor: 'pointer',
	borderRadius: '100px',
	color: 'white',
	padding: '1.25rem 0',
	backgroundColor: COLORS.Primary,

	transition: 'all .2s',
	':hover': {
		backgroundColor: 'rgb(0, 124, 97)'
	},
	':active': {
		backgroundColor: 'rgb(0, 139, 109)'
	}
});

const btnDisabledCss = cxs({
	backgroundColor: COLORS.DarkGray,
	'& > span': {
		opacity: '0.6'
	},
	':hover': {
		backgroundColor: COLORS.DarkGray
	}
});

interface ButtonProps {
	handleClick?: () => void;
	children: ComponentChildren;
	disabled?: boolean;
	className?: string;
}
export const SubmitButton = ({
	handleClick,
	disabled,
	className,
	children
}: ButtonProps) => {
	return (
		<button
			type="submit"
			className={[btnCss]
				.concat(disabled ? [btnDisabledCss] : [])
				.concat([className ? className : ''])
				.join(' ')}
			disabled={disabled}
			onClick={handleClick}
		>
			<span>{children}</span>
		</button>
	);
};
