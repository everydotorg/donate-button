import cxs from 'cxs';
import {FunctionalComponent} from 'preact';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';

cxs.prefix('edoWidgetGrid-');
const gridCss = cxs({
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

	'& > #edo-header': {gridArea: 'header'},
	'& > #edo-promoBanners': {gridArea: 'promoBanners'},
	'& > #edo-nonprofitInfo': {gridArea: 'nonprofitInfo'},
	'& > #edo-paymentProcess': {gridArea: 'paymentProcess'},
	'& > #edo-faq': {gridArea: 'faq'},
	'& > #edo-fundraiserLink': {gridArea: 'fundraiserLink'},
	'& > #edo-footer': {gridArea: 'footer'}
});

export const Grid: FunctionalComponent = ({children}) => {
	return <div className={gridCss}>{children}</div>;
};
