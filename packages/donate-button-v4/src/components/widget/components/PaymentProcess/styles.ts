import cxs from 'cxs';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {Spacing, verticalStackCss} from 'src/components/widget/theme/spacing';

export const cardCss = cxs({
	padding: `${Spacing.XL} ${Spacing.XL} 0px`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: '0px'
	}
});

export const fieldSetCss = cxs({
	border: 'none',
	padding: 0,
	margin: 0,
	fontSize: '100%',
	font: 'inherit',
	verticalAlign: 'baseline'
});

export const legendCss = cxs({
	fontWeight: 700,
	...textSize.s,
	marginBottom: Spacing.S
});

export const fixedFrequencyCss = cxs({
	fontWeight: 700,
	...textSize.l
});

export const fixedAmountsCss = cxs({
	fontWeight: 700,
	...textSize.xl
});

export const formContainerCss = cxs({
	...verticalStackCss.cxs(Spacing.XL),
	padding: '0px',
	[BREAKPOINTS.TabletLandscapeUp]: {
		gridColumn: '2/3',
		padding: Spacing.XXL
	}
});

export const frequencyAndAmountCss = ({
	horizontal,
	fixedAmount
}: {
	horizontal: boolean;
	fixedAmount: boolean;
}) =>
	horizontal
		? cxs({
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridColumnGap: Spacing.L
		  })
		: cxs({
				...verticalStackCss.cxs(Spacing.XL),
				...(fixedAmount
					? {
							'> fieldset:last-child': {
								alignSelf: 'center'
							}
					  }
					: {})
		  });

export const formCss = cxs({
	display: 'grid',
	gridTemplateColumns: '1fr',

	[BREAKPOINTS.TabletLandscapeUp]: {
		gridAutoFlow: 'column',
		gridTemplateColumns: 'auto 1fr'
	}
});
