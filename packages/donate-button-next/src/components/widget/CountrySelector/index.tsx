import cxs from 'cxs';
import {CountryOption} from 'src/components/widget/CountrySelector/CountryOption';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {Routes} from 'src/components/widget/types/routes';

const countriesListCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	margin: `${Spacing.XL} 0`,
	'& > :not(:last-child)': {
		margin: Spacing.Stack_XL
	}
});

const sectionTitleCss = cxs({
	...bodyText
});

export const CountrySelector = () => {
	const {
		setRoute,
		country: selectedCountry,
		setCountry,
		setCurrency
	} = useWidgetContext();
	const {countries, currencies} = useConfigContext();
	const i18n = useI18n();

	const selectCountry = (country: DonationRecipient) => {
		const currency = currencies.find((c) =>
			c.countryCodes.includes(country.countryCode)
		);

		setCountry(country);

		if (currency) setCurrency(currency);

		setRoute(Routes.DonationForm);
	};

	return (
		<SectionContainer
			renderHeader={
				<span className={sectionTitleCss}>{i18n.countrySelection}</span>
			}
			renderBody={
				<div className={countriesListCss}>
					{countries.map((country) => (
						<CountryOption
							key={`${country.id}-${country.name}`}
							isSelected={selectedCountry === country}
							country={country}
							selectCountry={selectCountry}
						/>
					))}
				</div>
			}
		/>
	);
};
