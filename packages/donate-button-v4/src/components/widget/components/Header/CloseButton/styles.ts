import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Spacing} from 'src/components/widget/theme/spacing';

export const buttonCss = cxs({
	cursor: 'pointer',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 0,
	border: 'none',
	backgroundColor: 'transparent',
	fontFamily: FontFamily.BasisGrotesque
});

export const smallScreenCloseButtonCss = cxs({
	display: 'block',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

export const largeScreenCloseButtonCss = cxs({
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
