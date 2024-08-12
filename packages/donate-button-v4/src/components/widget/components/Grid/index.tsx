import {FunctionalComponent} from 'preact';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';
import css from 'src/helpers/css';

const gridCss = css({
	display: 'grid',
	gridGap: 0,
	gridTemplateColumns: '1fr',
	gridTemplateAreas: `"header"
    "promoBanners"
    "nonprofitInfo"
    "paymentProcess"
    "fundraiserLink"
    "faq"
    "footer"`,

	[BREAKPOINTS.TabletLandscapeUp]: {
		gridColumnGap: Spacing.XL,
		gridTemplateColumns: '1fr 2fr',
		gridTemplateRows: 'auto auto auto auto auto 1fr',
		gridTemplateAreas: `"header header"
    "promoBanners promoBanners"
    "nonprofitInfo paymentProcess"
    "fundraiserLink paymentProcess"
    "faq paymentProcess"
    "faq footer"`,
		'& > div:not(:last-child):not(:empty)': {
			marginBottom: Spacing.XL
		}
	},

	'& > #every-header': {
		gridArea: 'header',
		display: 'block',
		[BREAKPOINTS.TabletLandscapeUp]: {
			display: 'none'
		}
	},
	'& > #every-promoBanners': {gridArea: 'promoBanners'},
	'& > #every-nonprofitInfo': {gridArea: 'nonprofitInfo'},
	'& > #every-paymentProcess': {gridArea: 'paymentProcess'},
	'& > #every-faq': {gridArea: 'faq'},
	'& > #every-fundraiserLink': {gridArea: 'fundraiserLink'},
	'& > #every-footer': {gridArea: 'footer'}
});

export const Grid: FunctionalComponent = ({children}) => {
	return <div className={gridCss}>{children}</div>;
};
