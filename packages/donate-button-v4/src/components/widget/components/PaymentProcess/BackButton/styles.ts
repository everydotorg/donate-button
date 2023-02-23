import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

export const backButtonCss = (primaryColor: string) =>
	cxs({
		outline: 'none',
		border: 'none',
		fontFamily: 'inherit',
		cursor: 'pointer',
		background: 'none',
		fontWeight: 500,
		transition: 'opacity .3s',
		color: primaryColor,
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'flex-start',
		...textSize.s,
		opacity: 1,
		padding: 0,
		gap: Spacing.XXS,
		marginBottom: Spacing.XXL,
		':hover': {
			opacity: 0.9
		},
		[BREAKPOINTS.TabletLandscapeUp]: {
			padding: Spacing.L,
			marginBottom: 0
		}
	});
