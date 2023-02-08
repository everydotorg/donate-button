import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';

export const containerCss = cxs({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	padding: `${Spacing.M} ${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: 0
	}
});
