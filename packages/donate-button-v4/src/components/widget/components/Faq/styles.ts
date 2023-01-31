// import cxs from 'cxs';

import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {horizontalStackCss, Spacing} from 'src/components/widget/theme/spacing';

// cxs.prefix('edoWidgetFaq-');
export const faqListCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	gap: Spacing.M
});

export const rotateCss: cxs.CSSObject = {
	position: 'relative',
	top: '-1px',
	transform: 'rotate(180deg)'
};

export const descriptionBaseCss: cxs.CSSObject = {
	'> p': {
		marginBottom: Spacing.XS
	}
};
export const descriptionOpen = cxs({
	...descriptionBaseCss,
	maxHeight: '1000px',
	transition: 'all 1s',
	opacity: '1'
});

export const descriptionClose = cxs({
	...descriptionBaseCss,
	opacity: '0',
	overflow: 'hidden',
	maxHeight: '0',
	transition: 'all 0.5s'
});

export const faqItemConateinerCss = (mobileOnly?: boolean) =>
	cxs({
		...textSize.xs,
		...(mobileOnly
			? {
					[BREAKPOINTS.TabletLandscapeUp]: {
						padding: 'none'
					}
			  }
			: {})
	});

export const faqItemButtonCss = (isOpen: boolean) =>
	cxs({
		...horizontalStackCss.cxs(Spacing.S),
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		border: 'none',
		background: 'transparent',
		textAlign: 'start',
		padding: 0,
		marginBottom: Spacing.XS,
		':hover': {cursor: 'pointer'},
		'> svg': {
			width: '16px',
			height: '16px',
			...(isOpen ? rotateCss : {})
		},
		...(isOpen
			? {
					fontWeight: 700
			  }
			: {
					fontWeight: 500,
					color: COLORS.TextGray
			  })
	});

export const faqLinkCss = cxs({
	color: COLORS.Text,
	fontWeight: 500,
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline'
	}
});
