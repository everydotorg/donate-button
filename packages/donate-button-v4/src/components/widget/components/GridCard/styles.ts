import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

export const cardCss = css({
	backgroundColor: 'white',
	padding: `${Spacing.XL} ${Spacing.XL} 0px`,
	borderRadius: 'unset',
	overflow: 'hidden',
	[BREAKPOINTS.TabletLandscapeUp]: {
		borderRadius: '16px',
		padding: Spacing.M
	}
});
