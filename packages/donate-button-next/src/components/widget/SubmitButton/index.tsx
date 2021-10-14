import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {RedirectNotice} from 'src/components/widget/RedirectNotice';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const btnCss = cxs({
	...bodyText,
	outline: 'none',
	marginBottom: Spacing.M,
	width: '100%',
	border: 'none',
	fontFamily: 'inherit',
	cursor: 'pointer',
	borderRadius: Radii.Default,
	height: '52px',
	padding: Spacing.XXS,
	transition: 'opacity .3s'
});

const btnActiveColor = (color: string) =>
	cxs({
		color: COLORS.White,
		backgroundColor: color,
		':hover': {
			opacity: 0.9
		}
	});

const btnDisabledCss = cxs({
	color: COLORS.White,
	backgroundColor: COLORS.DarkGray,
	cursor: 'default',
	'& > span': {
		opacity: '0.6'
	}
});

interface ButtonProps {
	handleClick?: () => void;
	children: ComponentChildren;
	disabled?: boolean;
	classes?: string[];
}

export const SubmitButton = ({
	handleClick,
	disabled,
	classes,
	children
}: ButtonProps) => {
	const {primaryColor} = useConfigContext();

	return (
		<div className={classes ? classes.join(' ') : undefined}>
			<button
				type="submit"
				className={[btnCss]
					.concat(disabled ? [btnDisabledCss] : [btnActiveColor(primaryColor)])
					.join(' ')}
				disabled={disabled}
				onClick={handleClick}
			>
				<span>{children}</span>
			</button>

			<RedirectNotice />
		</div>
	);
};
