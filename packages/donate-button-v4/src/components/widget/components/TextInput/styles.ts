import cxs from 'cxs';
import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

export const textInputContainerErrorCss = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.Error)
});

export const textInputContainerCss = (color: string) =>
	cxs({
		position: 'relative',
		padding: Spacing.M,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: Radii.Default,
		color: COLORS.Text,
		backgroundColor: COLORS.Gray,
		border: getColoredBorder(Borders.Normal, COLORS.LightGray),
		cursor: 'text',
		':focus-within': {
			backgroundColor: 'white',
			borderColor: color
		}
	});

export const textInputCss = cxs({
	fontSize: textSize.s.fontSize,
	lineHeight: textSize.s.fontSize,
	fontFamily: 'inherit',
	flex: 1,
	border: 'none',
	outline: 'none',
	background: 'transparent',
	width: '100%',
	minWidth: 'unset',
	padding: 0,
	margin: 0,
	'::placeholder': {
		fontWeight: 400
	},
	'::-webkit-outer-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0
	},
	'::-webkit-inner-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0
	},
	'-moz-appearance': 'textfield'
});
