import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';

export const linkCss = (primaryColor: string) =>
	cxs({
		color: primaryColor,
		fontWeight: 500,
		textDecoration: 'none',
		':hover': {
			textDecoration: 'underline'
		}
	});

export const cardCss = cxs({
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});
