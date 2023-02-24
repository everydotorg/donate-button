import cxs from 'cxs';
import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {horizontalStackCss, Spacing} from 'src/components/widget/theme/spacing';

export const inputContainerErrorCss = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.Error)
});

export const inputContainerCss = (color: string) =>
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

export const inputCss = cxs({
	fontSize: textSize.l.fontSize,
	lineHeight: textSize.l.fontSize,
	fontFamily: 'inherit',
	fontWeight: 700,
	flex: 1,
	border: 'none',
	outline: 'none',
	background: 'transparent',
	width: '100%',
	minWidth: 'unset',
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

export const inputPrefixCss = cxs({
	...textSize.l,
	fontWeight: 700,
	display: 'inline-flex',
	marginRight: Spacing.XXS
});

export const inputSufixCss = (primaryColor: string) =>
	cxs({
		...textSize.m,
		fontWeight: 700,
		color: primaryColor,
		display: 'inline-flex',
		marginLeft: Spacing.XXS
	});

export const addAmountContainerCss = cxs({
	...horizontalStackCss.cxs(Spacing.M),
	justifyContent: 'center'
});

export const addAmountButtonCss = (primaryColor: string) =>
	cxs({
		...textSize.s,
		color: primaryColor,
		borderRadius: Radii.Big,
		fontWeight: 500,
		border: `none`,
		padding: 0,
		fontFamily: 'inherit',
		cursor: 'pointer',
		background: 'unset',

		[BREAKPOINTS.TabletLandscapeUp]: {
			border: `1px solid ${COLORS.DarkGray}`,
			padding: `${Spacing.XS} ${Spacing.L}`
		}
	});
