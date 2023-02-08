import cxs from 'cxs';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

export const btnCss = cxs({
	...bodyText,
	outline: 'none',
	width: '100%',
	border: 'none',
	fontFamily: 'inherit',
	cursor: 'pointer',
	borderRadius: Radii.Big,
	height: '52px',
	fontWeight: 700,
	padding: Spacing.XXS,
	transition: 'opacity .3s'
});

export const btnActiveColor = (color: string) =>
	cxs({
		color: COLORS.White,
		backgroundColor: color,
		':hover': {
			opacity: 0.9
		}
	});

export const btnDisabledCss = cxs({
	color: COLORS.White,
	backgroundColor: COLORS.DarkGray,
	cursor: 'default',
	'& > span': {
		opacity: '0.6'
	}
});
