import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

export const overlayCss = cxs({
	...textSize.s,
	position: 'fixed',
	height: 'auto',
	width: '100%',
	zIndex: 999,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	display: 'flex',
	background: 'rgba(0, 0, 0, 0.5)',
	justifyContent: 'center',
	alignItems: 'center',
	color: COLORS.Text,
	fontFamily: FontFamily.BasisGrotesque,
	padding: 0,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: Spacing.XL
	},
	// reset
	boxSizing: 'border-box',
	'-webkit-font-smoothing': 'antialiased',
	'-moz-osx-font-smoothing': 'grayscale',
	'& *': {
		boxSizing: 'inherit'
	},
	'& *:before': {
		boxSizing: 'inherit'
	},
	'& *:after': {
		boxSizing: 'inherit'
	}
});
