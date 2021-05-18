import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {linkText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const btnCss = cxs({
	...linkText,
	border: getColoredBorder(Borders.Normal, COLORS.White),
	outline: 'none',
	width: '100%',

	fontFamily: 'inherit',
	fontWeight: 500,

	cursor: 'pointer',
	borderRadius: Radii.Big,
	color: COLORS.White,
	padding: `${Spacing.L} ${Spacing.Empty}`,
	backgroundColor: COLORS.Primary,

	transition: 'backgroundColor .2s',
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
