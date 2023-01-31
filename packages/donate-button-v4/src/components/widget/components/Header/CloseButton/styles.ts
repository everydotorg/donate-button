import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {buttonText} from 'src/components/widget/theme/font-sizes';

export const buttonCss = cxs({
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 0,
	border: 'none',
	backgroundColor: 'transparent',
	fontFamily: FontFamily.BasisGrotesque
});

export const iconCss = cxs({
	height: '100%',
	display: 'block',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

export const textCss = (primaryColor: string) =>
	cxs({
		color: primaryColor,
		...buttonText,
		fontWeight: 500,
		display: 'none',
		[BREAKPOINTS.TabletLandscapeUp]: {
			display: 'block'
		}
	});
