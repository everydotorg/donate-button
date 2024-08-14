import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import css from 'src/helpers/css';

export const linkCss = (primaryColor: string) =>
	css({
		color: primaryColor,
		fontWeight: 500,
		textDecoration: 'none',
		':hover': {
			textDecoration: 'underline'
		}
	});

export const cardCss = css({
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});
