import {rotateCss} from 'src/components/widget/components/Faq/styles';
import {textInputContainerCss} from 'src/components/widget/components/TextInput/styles';
import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText, textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';
import joinClassNames from 'src/helpers/joinClassNames';

export const cryptoSelectorContainerCss = css({
	maxHeight: '250px',
	'& input': {
		fontSize: textSize.s.fontSize,
		lineHeight: textSize.s.fontSize,
		fontWeight: 400
	}
});

export const cryptoSelectorDropDownContainerCss = css({
	background: COLORS.White,
	borderRadius: `0 0 ${Radii.Default} ${Radii.Default}`,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderTop: 'none'
});

export const cryptoSelectorInputContainerCss = css({
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XXS
});

export const cryptoSelectorDropDownContentCss = css({
	overflowY: 'scroll',
	height: '100%',
	maxHeight: '200px'
});

export const quickSelectOptionsListCss = css({
	borderBottom: getColoredBorder(Borders.Normal, COLORS.LightGray)
});

export const cryptoSelectorDropDownItemCss = css({
	border: 'none',
	background: 'none',

	padding: `${Spacing.S} ${Spacing.M}`,
	...textSize.s,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XS,
	':hover': {
		cursor: 'pointer'
	},

	'> span:last-of-type': {
		marginLeft: 'auto',
		...textSize.xs,
		color: COLORS.TextGray
	}
});

export const cryptoSelectorInputSufixCss = (
	primaryColor: string,
	showDropDown: boolean
) =>
	css({
		marginLeft: 'auto',
		...textSize.xs,
		color: COLORS.TextGray,
		display: 'flex',
		gap: Spacing.XS,
		alignItems: 'center',
		'> svg': {
			color: primaryColor,
			...(showDropDown ? rotateCss : {})
		}
	});

export const inputContainerWithDropDownCss = css({
	borderRadius: `${Radii.Default} ${Radii.Default} 0 0 `
});

export const cryptoAmountInputContainerCss = (primaryColor: string) =>
	joinClassNames([textInputContainerCss(primaryColor)]);

export const cryptoAmountInputColumns = css({
	display: 'flex',
	width: '100%',
	gap: Spacing.S,
	alignItems: 'flex-end',
	fontWeight: 500
});

export const cryptoAmountInputFirstColumn = css({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: Spacing.XXS,
	'> input': {
		width: '100%',
		textAlign: 'right',
		fontWeight: 700,
		...textSize.l
	},
	textAlign: 'right'
});

export const cryptoAmountInputSecondColumn = css({
	gap: Spacing.XXS,
	display: 'flex',
	flexDirection: 'column'
});

export const changeModeButtonCss = css({
	...bodyText,
	outline: 'none',
	border: 'none',
	fontFamily: 'inherit',
	cursor: 'pointer',
	padding: Spacing.XXS,
	transform: 'rotate(90deg)',
	color: COLORS.TextGray,
	'> svg': {
		strokeWidth: '2px'
	}
});
