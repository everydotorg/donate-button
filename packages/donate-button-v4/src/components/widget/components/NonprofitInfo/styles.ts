import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {
	horizontalStackCss,
	Spacing,
	verticalStackCss
} from 'src/components/widget/theme/spacing';

export const nonprofitNameCss = cxs({
	'> span': {
		fontWeight: 700
	}
});

export const logoImageCss = (logoUrl: string) =>
	cxs({
		borderRadius: Radii.Circle,
		overflow: 'hidden',
		display: 'block',
		backgroundImage: `url(${logoUrl})`,
		backgroundSize: 'contain',
		width: '40px',
		height: '40px',
		flexShrink: 0,
		[BREAKPOINTS.TabletLandscapeUp]: {
			width: '64px',
			height: '64px'
		}
	});

export const cardCss = cxs({
	padding: `${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		...verticalStackCss.cxs(Spacing.S),
		padding: `${Spacing.L}`
	}
});

export const avatarAndNameWrapperCss = cxs({
	...horizontalStackCss.cxs(Spacing.S),
	alignItems: 'center'
});

export const descriptionCss = cxs({
	...textSize.xs,
	color: 'rgba(0, 0, 0, 0.7)',
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});
