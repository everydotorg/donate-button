import cxs from 'cxs';
import {Ref} from 'preact';
import {forwardRef, useEffect, useState} from 'preact/compat';
import {Popover} from 'src/components/widget/Popover';
import {supportedCountries} from 'src/components/widget/constants/supported-countries';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
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
		const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
		const {country, currency, setCurrency, donationAmount} = useWidgetContext();

		useEffect(() => {
			setShowSuggestion(supportedCountries?.[country]?.currency !== currency);
		}, [country, currency]);

		const dismiss = () => {
			setShowSuggestion(false);
		};

		const updateCurrency = () => {
			setCurrency(supportedCountries[country].currency);
		};

		const suggestedCurrency = supportedCountries?.[country]?.currency;

		return showSuggestion ? (
			<Popover ref={ref} arrowPosition="85%">
				<div className={containerCss}>
					<p className={bodyCss}>
						It’s recommended to donate <strong>{suggestedCurrency}</strong> if
						you are getting a {country} tax receipt, would you like to switch
						from{' '}
						<strong>
							{donationAmount} {currency}
						</strong>{' '}
						to{' '}
						<strong>
							{donationAmount} {suggestedCurrency}
						</strong>
					</p>
					<div className={actionsCss}>
						<button
							type="button"
							className={buttonPrimaryCss}
							onClick={updateCurrency}
						>
							Change to {suggestedCurrency}
						</button>
						<button
							type="button"
							className={buttonSecondaryCss}
							onClick={dismiss}
						>
							No thanks
						</button>
					</div>
				</div>
			</Popover>
		) : null;
	}
);
