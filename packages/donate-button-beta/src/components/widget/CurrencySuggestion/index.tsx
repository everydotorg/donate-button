import cxs from 'cxs';
import {Ref} from 'preact';
import {forwardRef, useEffect, useMemo, useState} from 'preact/compat';
import {Popover} from 'src/components/widget/Popover';
import {supportedCountries} from 'src/components/widget/constants/supported-countries';
import useI18n from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {replaceKeys, getBoldFormatted} from 'src/helpers/interpolation';

const containerCss = cxs({
	padding: Spacing.Inset_M
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

		const i18n = useI18n();

		const popoverText = useMemo(
			() =>
				getBoldFormatted(
					replaceKeys(
						{
							suggestedCurrency,
							country,
							fromCurrency: `${donationAmount} ${currency}`,
							toCurrency: `${donationAmount} ${suggestedCurrency}`
						},
						i18n.currencyPopover
					)
				),
			[i18n, currency, suggestedCurrency, country, donationAmount]
		);

		const changeButtonText = useMemo(
			() =>
				replaceKeys(
					{
						suggestedCurrency
					},
					i18n.switchCurrency
				),
			[i18n, suggestedCurrency]
		);

		return showSuggestion ? (
			<Popover ref={ref} arrowPosition="85%">
				<div className={containerCss}>
					{popoverText}
					<div className={actionsCss}>
						<button
							type="button"
							className={buttonPrimaryCss}
							onClick={updateCurrency}
						>
							{changeButtonText}
						</button>
						<button
							type="button"
							className={buttonSecondaryCss}
							onClick={dismiss}
						>
							{i18n.noThanks}
						</button>
					</div>
				</div>
			</Popover>
		) : null;
	}
);
