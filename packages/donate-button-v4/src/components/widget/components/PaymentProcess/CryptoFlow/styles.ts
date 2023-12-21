import cxs from 'cxs';
import {rotateCss} from 'src/components/widget/components/Faq/styles';
import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

export const cryptoSelectorContainerCss = cxs({
	height: '250px',
	'& input': {
		fontSize: textSize.s.fontSize,
		lineHeight: textSize.s.fontSize,
		fontWeight: 400
	}
});

export const cryptoSelectorDropDownContainerCss = cxs({
	background: COLORS.White,
	borderRadius: `0 0 ${Radii.Default} ${Radii.Default}`,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderTop: 'none'
});

export const cryptoSelectorInputContainerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	gap: Spacing.XXS
});
export const cryptoSelectorDropDownContentCss = cxs({
	overflowY: 'scroll',
	height: '100%',
	maxHeight: '200px'
});

export const quickSelectOptionsListCss = cxs({
	borderBottom: getColoredBorder(Borders.Normal, COLORS.LightGray)
});

export const cryptoSelectorDropDownItemCss = cxs({
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
	cxs({
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

export const inputContainerWithDropDownCss = cxs({
	borderRadius: `${Radii.Default} ${Radii.Default} 0 0 `
});

export const cryptoAmountInputContainerCss = cxs({
	gap: Spacing.XS,
	'> input': {
		textAlign: 'right'
	}
});

export const cryptoAmountInputCss = cxs({});
