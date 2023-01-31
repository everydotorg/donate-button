import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Spacing} from 'src/components/widget/theme/spacing';

cxs.prefix('edoWidgetOverlay-');
export const overlayCss = cxs({
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
