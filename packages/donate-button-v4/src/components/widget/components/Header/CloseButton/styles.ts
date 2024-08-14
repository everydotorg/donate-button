import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const buttonCss = css({
	cursor: 'pointer',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 0,
	border: 'none',
	backgroundColor: 'transparent',
	fontFamily: FontFamily.BasisGrotesque
});

export const smallScreenCloseButtonCss = css({
	display: 'block',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

export const largeScreenCloseButtonCss = css({
	position: 'absolute',
	right: Spacing.XL,
	top: Spacing.XL,

	padding: Spacing.XXS,
	background: 'white',
	borderRadius: '8px',

	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});
