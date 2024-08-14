import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const containerCss = css({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	padding: `${Spacing.M} ${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: 0
	}
});
