import cxs from 'cxs';
import {Ref} from 'preact';
import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'preact/compat';
import {Popover} from 'src/components/widget/Popover';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {getBoldFormatted, replaceKeys} from 'src/helpers/interpolation';

const containerCss = cxs({
	padding: Spacing.Inset_M
});

const textCss = cxs({
	...labelText,
	fontWeight: 'normal'
});

const actionsCss = cxs({
	display: 'flex',
	marginTop: Spacing.M
});

const buttonPrimaryCss = (primaryColor: string) =>
	cxs({
		color: COLORS.White,
		background: primaryColor,
		padding: Spacing.InsetSquish_XS,
		borderRadius: Radii.Big,
		border: getColoredBorder(Borders.Normal, COLORS.Transparent),
		margin: Spacing.Inline_S,
		cursor: 'pointer'
	});

const buttonSecondaryCss = (primaryColor: string) =>
	cxs({
		color: primaryColor,
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
		const {primaryColor, currencies} = useConfigContext();

		useEffect(() => {
			setShowSuggestion(
				Boolean(country?.countryCode) &&
					!currency.countriesCode?.includes(country?.countryCode)
			);
		}, [country, currency]);

		const dismiss = () => {
			setShowSuggestion(false);
		};

		const getCountryCurrency = useCallback(
			(countryCode: string) => {
				return currencies.find((curr) =>
					curr.countriesCode.includes(countryCode)
				);
			},
			[currencies]
		);

		const updateCurrency = () => {
			const countryCurrency = getCountryCurrency(country?.countryCode);
			if (countryCurrency) {
				setCurrency(countryCurrency);
			}
		};

		const suggestedCurrency = getCountryCurrency(country?.countryCode);

		const i18n = useI18n();

		const popoverText = useMemo(
			() =>
				replaceKeys(
					{
						suggestedCurrency: suggestedCurrency?.name ?? '',
						country: country?.countryCode,
						fromCurrency: `${donationAmount} ${currency.name}`,
						toCurrency: `${donationAmount} ${suggestedCurrency?.name ?? ''}`
					},
					i18n.currencyPopover
				),
			[i18n, currency, suggestedCurrency, country, donationAmount]
		);

		const changeButtonText = useMemo(
			() =>
				replaceKeys(
					{
						suggestedCurrency: suggestedCurrency?.name ?? ''
					},
					i18n.switchCurrency
				),
			[i18n, suggestedCurrency]
		);

		return showSuggestion ? (
			<Popover ref={ref} arrowPosition="85%">
				<div className={containerCss}>
					<span className={textCss}>{getBoldFormatted(popoverText)}</span>
					<div className={actionsCss}>
						<button
							type="button"
							className={buttonPrimaryCss(primaryColor)}
							onClick={updateCurrency}
						>
							{changeButtonText}
						</button>
						<button
							type="button"
							className={buttonSecondaryCss(primaryColor)}
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
