import cxs from 'cxs';
import {Ref} from 'preact';
import {forwardRef} from 'preact/compat';
import {Popover} from 'src/components/widget/Popover';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	padding: Spacing.Inset_M
});

const bodyCss = cxs({
	...labelText,
	color: COLORS.Text,
	fontWeight: 'normal',
	margin: Spacing.Stack_M
});

const actionsCss = cxs({
	display: 'flex'
});

const buttonPrimaryCss = cxs({
	color: COLORS.White,
	background: COLORS.Primary,
	padding: Spacing.InsetSquish_XS,
	borderRadius: Radii.Big,
	border: getColoredBorder(Borders.Normal, COLORS.Transparent),
	margin: Spacing.Inline_S,
	cursor: 'pointer'
});

const buttonSecondaryCss = cxs({
	color: COLORS.Primary,
	background: COLORS.White,
	padding: Spacing.InsetSquish_S,
	borderRadius: Radii.Big,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	cursor: 'pointer'
});

export const CurrencySuggestion = forwardRef(
	(_props, ref: Ref<HTMLDivElement>) => {
		return (
			<Popover ref={ref} arrowPosition="85%">
				<div className={containerCss}>
					<p className={bodyCss}>
						It’s recommended to donate <strong>USD</strong> if you are getting a
						US tax receipt, would you like to switch from{' '}
						<strong>160 GBP</strong> to <strong>160 USD</strong>
					</p>
					<div className={actionsCss}>
						<button type="button" className={buttonPrimaryCss}>
							Change to USD
						</button>
						<button type="button" className={buttonSecondaryCss}>
							No thanks
						</button>
					</div>
				</div>
			</Popover>
		);
	}
);
