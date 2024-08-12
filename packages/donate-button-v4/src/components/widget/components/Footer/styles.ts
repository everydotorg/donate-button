import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const footerCardCss = css({
	padding: `${Spacing.XL} ${Spacing.XL} 0px`,
	backgroundColor: 'unset',

	display: 'flex',
	flexDirection: 'column',
	...textSize.xs,
	color: COLORS.TextGray,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: `0px ${Spacing.L}`
	},
	'> p': {
		margin: 0
	},
	'> p:not(:last-child)': {
		marginBottom: Spacing.XS
	}
});

export const footerLinkCss = css({
	color: COLORS.TextGray,
	fontWeight: 500,
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline'
	}
});
