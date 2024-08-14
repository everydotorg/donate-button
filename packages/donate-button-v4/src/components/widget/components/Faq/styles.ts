import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {horizontalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import css, {CSSObject} from 'src/helpers/css';

export const faqListCss = css({
	display: 'flex',
	flexDirection: 'column',
	gap: Spacing.M
});

export const rotateCss: CSSObject = {
	position: 'relative',
	top: '-1px',
	transform: 'rotate(180deg)'
};

export const descriptionBaseCss: CSSObject = {
	'> p': {
		marginBottom: Spacing.XS
	}
};
export const descriptionOpen = css({
	...descriptionBaseCss,
	maxHeight: '1000px',
	transition: 'all 1s',
	opacity: '1'
});

export const descriptionClose = css({
	...descriptionBaseCss,
	opacity: '0',
	overflow: 'hidden',
	maxHeight: '0',
	transition: 'all 0.5s'
});

export const faqItemConateinerCss = (mobileOnly?: boolean) =>
	css({
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
	css({
		...horizontalStackCss.css(Spacing.S),
		...textSize.xs,
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		border: 'none',
		background: 'transparent',
		textAlign: 'start',
		padding: 0,
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

export const faqLinkCss = css({
	color: COLORS.Text,
	fontWeight: 500,
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline'
	}
});
