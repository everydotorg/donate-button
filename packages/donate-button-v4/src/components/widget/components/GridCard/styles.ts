import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';

export const cardCss = cxs({
	backgroundColor: 'white',
	padding: `${Spacing.XL} ${Spacing.XL} 0px`,
	borderRadius: 'unset',
	overflow: 'hidden',
	[BREAKPOINTS.TabletLandscapeUp]: {
		borderRadius: '16px',
		padding: Spacing.M
	}
});
