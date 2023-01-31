import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {
	bodyText,
	headingText,
	smallText,
	textSize
} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

export const textContainerCss = cxs({
	...bodyText,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'initial',
	padding: Spacing.M,
	color: COLORS.Text
});

export const nonprofitNameCss = cxs({
	...headingText,
	margin: `0 0 ${Spacing.XXS} 0`,
	fontWeight: 700
});

export const locationAddressCss = cxs({
	...smallText,
	margin: 0,
	textTransform: 'uppercase',
	fontWeight: 700
});

export const headerContainerCss = (backgroundUrl: string) =>
	cxs({
		paddingBottom: 'calc(1 / 1.91 * 100%)',
		width: '100%',
		backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.2) 100%), url(${backgroundUrl})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative'
	});

const logoImageCssBase = (logoUrl: string) => ({
	borderRadius: Radii.Circle,
	overflow: 'hidden',
	display: 'block',
	backgroundImage: `url(${logoUrl})`,
	backgroundSize: 'contain'
});

export const largeLogoImageCss = (logoUrl: string) =>
	cxs({
		...logoImageCssBase(logoUrl),
		width: '64px',
		height: '64px',
		position: 'absolute',
		bottom: Spacing.M,
		right: Spacing.M
	});

export const smallLogoImageCss = (logoUrl: string) =>
	cxs({
		...logoImageCssBase(logoUrl),
		width: '40px',
		height: '40px',
		margin: Spacing.Inline_M
	});

export const largeCardCss = cxs({
	padding: '0px',
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});

export const smallCardCss = cxs({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	padding: `${Spacing.XL}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'none'
	}
});

export const descriptionCss = cxs({
	margin: 0,
	marginTop: Spacing.XS,
	...textSize.xs
});
