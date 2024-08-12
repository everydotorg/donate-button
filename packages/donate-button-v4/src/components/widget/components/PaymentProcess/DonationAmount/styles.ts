import {getColoredBorder, Borders} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {horizontalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const donationAmountInputContainerErrorCss = css({
	border: getColoredBorder(Borders.Normal, COLORS.Error)
});

export const donationAmountInputCss = css({
	fontSize: textSize.l.fontSize,
	lineHeight: textSize.l.fontSize,
	fontWeight: 700
});

export const donationAmountInputPrefixCss = css({
	...textSize.l,
	fontWeight: 700,
	display: 'inline-flex',
	marginRight: Spacing.XXS
});

export const donationAmountInputSufixCss = (primaryColor: string) =>
	css({
		...textSize.m,
		fontWeight: 700,
		color: primaryColor,
		display: 'inline-flex',
		marginLeft: Spacing.XXS
	});

export const donationAmountAddAmountContainerCss = css({
	...horizontalStackCss.css(Spacing.M),
	justifyContent: 'center'
});

export const donationAmountAddAmountButtonCss = (primaryColor: string) =>
	css({
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
