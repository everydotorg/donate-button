import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
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

	transition: 'opacity .2s',
	':hover': {
		opacity: '0.7'
	},
	':active': {
		opacity: '0.9'
	}
});

const btnActiveColor = (primaryColor: string) =>
	cxs({
		backgroundColor: primaryColor
	});

const btnDisabledCss = cxs({
	backgroundColor: COLORS.DarkGray,
	':hover': {
		opacity: '1'
	},
	'& > span': {
		opacity: '0.6'
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
	const {primaryColor} = useConfigContext();

	return (
		<button
			type="submit"
			className={[btnCss]
				.concat(disabled ? [btnDisabledCss] : [btnActiveColor(primaryColor)])
				.concat([className ? className : ''])
				.join(' ')}
			disabled={disabled}
			onClick={handleClick}
		>
			<span>{children}</span>
		</button>
	);
};
