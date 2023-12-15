import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {
	horizontalStackCss,
	Spacing,
	verticalStackCss
} from 'src/components/widget/theme/spacing';
import joinClassNames from 'src/helpers/joinClassNames';

export const nonprofitNameCss = cxs({
	lineHeight: '20px',
	fontWeight: 'unset',
	'> span': {
		fontWeight: 700
	}
});

export const fundraiserNameCss = cxs({
	lineHeight: '20px',
	fontWeight: 'unset',
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

export const fundraiserCardLogoCss = (logoUrl: string) =>
	joinClassNames([
		logoImageCss(logoUrl),
		cxs({
			width: '32px',
			height: '32px',
			flexShrink: 0,
			[BREAKPOINTS.TabletLandscapeUp]: {
				width: '40px',
				height: '40px'
			}
		})
	]);

export const nonprofitCardCss = cxs({
	padding: `${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		...verticalStackCss.cxs(Spacing.S),
		padding: `${Spacing.L}`
	}
});

export const largeFundraiserCardCss = cxs({
	display: 'none',
	overflow: 'hidden',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'flex',
		gap: `${Spacing.S}`,
		flexDirection: 'column',
		padding: `${Spacing.L}`
	}
});

export const smallFundraiserCardCss = cxs({
	display: 'flex',
	gap: `${Spacing.S}`,
	padding: `${Spacing.XL}`,
	overflow: 'hidden',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none',
		flexDirection: 'column',
		padding: `${Spacing.L}`
	}
});

export const avatarAndNameWrapperCss = cxs({
	...horizontalStackCss.cxs(Spacing.S),
	alignItems: 'center'
});

export const fundraiserAvatarAndNameWrapperCss = cxs({
	display: 'flex',
	gap: `${Spacing.S}`,
	alignItems: 'center',

	'& > .every-embedded-fundraiser-card__nonprofit-name': {
		display: 'none',
		[BREAKPOINTS.TabletLandscapeUp]: {
			display: 'block'
		}
	}
});

export const descriptionCss = cxs({
	...textSize.xs,
	color: 'rgba(0, 0, 0, 0.7)',
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});

export const truncatedTextCss = (numberLines: number) =>
	cxs({
		overflow: 'hidden',
		overflowWrap: 'anywhere',
		wordBreak: 'break-word',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': numberLines,
		alignItems: 'start'
	});
