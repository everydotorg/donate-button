import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {
	horizontalStackCss,
	Spacing,
	verticalStackCss
} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';
import joinClassNames from 'src/helpers/joinClassNames';

export const nonprofitNameCss = css({
	lineHeight: '20px',
	fontWeight: 'unset',
	'> span': {
		fontWeight: 700
	}
});

export const fundraiserNameCss = css({
	lineHeight: '20px',
	fontWeight: 'unset',
	'> span': {
		fontWeight: 700
	}
});

export const logoImageCss = (logoUrl: string) =>
	css({
		borderRadius: Radii.Circle,
		overflow: 'hidden',
		display: 'block',
		backgroundImage: `url(${logoUrl})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
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
		css({
			width: '32px',
			height: '32px',
			flexShrink: 0,
			[BREAKPOINTS.TabletLandscapeUp]: {
				width: '40px',
				height: '40px'
			}
		})
	]);

export const nonprofitCardCss = css({
	padding: `${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		...verticalStackCss.css(Spacing.S),
		padding: `${Spacing.L}`
	}
});

export const largeFundraiserCardCss = css({
	display: 'none',
	overflow: 'hidden',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'flex',
		gap: `${Spacing.S}`,
		flexDirection: 'column',
		padding: `${Spacing.L}`
	}
});

export const smallFundraiserCardCss = css({
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

export const avatarAndNameWrapperCss = css({
	...horizontalStackCss.css(Spacing.S),
	alignItems: 'center'
});

export const fundraiserAvatarAndNameWrapperCss = css({
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

export const descriptionCss = css({
	...textSize.xs,
	color: 'rgba(0, 0, 0, 0.7)',
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});

export const truncatedTextCss = (numberLines: number) =>
	css({
		overflow: 'hidden',
		overflowWrap: 'anywhere',
		wordBreak: 'break-word',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': numberLines,
		alignItems: 'start'
	});
