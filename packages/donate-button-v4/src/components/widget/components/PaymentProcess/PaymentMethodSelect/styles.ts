import cxs from 'cxs';
import {fieldSetCss} from 'src/components/widget/components/PaymentProcess/styles';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {
	verticalStackCss,
	horizontalStackCss,
	Spacing
} from 'src/components/widget/theme/spacing';
import joinClassNames from 'src/helpers/joinClassNames';

export const largePaymentMethodSelectListCss = cxs({
	height: '100%',
	width: '100%',
	minWidth: '170px',
	flexGrow: 1,
	backgroundColor: COLORS.LightGray,
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		...verticalStackCss.cxs(0)
	}
});

export const smallPaymentMethodFieldSetCss = joinClassNames([
	fieldSetCss,
	cxs({
		display: 'block',
		[BREAKPOINTS.TabletLandscapeUp]: {
			display: 'none'
		}
	})
]);

export const smallPaymentMethodSelectListCss = cxs({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridGap: Spacing.S
});

export const paymentMethodButtonCssBase: cxs.CSSObject = {
	...horizontalStackCss.cxs(Spacing.XS),
	alignItems: 'center',
	justifyContent: 'flex-start',
	width: '100%',
	background: 'transparent'
};

export const largePaymentMethodButtonCss = (selected: boolean) =>
	cxs({
		...paymentMethodButtonCssBase,
		border: 'none',
		padding: Spacing.M,

		':hover': {
			cursor: 'pointer',
			background: COLORS.Gray
		},
		...(selected
			? {
					background: 'white',
					fontWeight: 700,
					':hover': {
						background: 'white'
					}
			  }
			: {})
	});

export const smallPaymentMethodButtonCss = (
	selected: boolean,
	primaryColor: string
) =>
	cxs({
		...paymentMethodButtonCssBase,
		border: `1px solid ${COLORS.DarkGray}`,
		background: 'transparent',
		textAlign: 'start',
		padding: `${Spacing.XXS} ${Spacing.S}`,
		borderRadius: Radii.Default,
		':hover': {
			cursor: 'pointer',
			background: COLORS.Gray
		},
		'& > svg': {
			width: '20px',
			height: '20px'
		},
		...(selected
			? {
					background: primaryColor,
					border: `1px solid ${primaryColor}`,
					fontWeight: 700,
					color: 'white',
					'& > svg': {
						filter: 'brightness(0) invert(1)',
						width: '20px',
						height: '20px'
					},
					':hover': {
						background: primaryColor
					}
			  }
			: {})
	});
