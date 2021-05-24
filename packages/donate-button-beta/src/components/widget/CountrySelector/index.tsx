import cxs from 'cxs';
import {PaymentMethod} from 'src/components/widget/CountrySelector/blocks/PaymentMethod';
import {CountryTitle} from 'src/components/widget/CountryTitle';
import {SectionContainer} from 'src/components/widget/SectionContainer';
import {
	Country,
	supportedCountries
} from 'src/components/widget/constants/supported-countries';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

const countriesListCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	'& > *': {
		margin: Spacing.Stack_M
	}
});

const countryOptionContainerCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	padding: Spacing.Inset_S,
	borderRadius: Radii.Default,
	cursor: 'pointer'
});

const countryHeaderCss = cxs({
	display: 'flex',
	alignItems: 'center',
	margin: Spacing.Stack_XS
});

const descriptionCss = cxs({
	...labelText,
	margin: Spacing.Stack_M
});

const sectionTitleCss = cxs({
	...labelText
});

const paymentMethodsCss = cxs({
	display: 'flex',
	flexWrap: 'wrap',
	'& > *:not(:last-child)': {
		marginRight: '0.875rem'
	}
});

const CountryOption = ({
	country,
	onClick
}: {
	country: Country;
	onClick: (country: Country) => void;
}) => {
	const countryInfo = supportedCountries[country];

	return (
		<div
			className={countryOptionContainerCss}
			onClick={() => {
				onClick(country);
			}}
		>
			<div className={countryHeaderCss}>
				<CountryTitle country={country} />
			</div>
			<p className={descriptionCss}>{countryInfo.description}</p>
			<div className={paymentMethodsCss}>
				{countryInfo.paymentMethods.map((pm) => (
					<PaymentMethod key={pm} paymentMethod={pm} />
				))}
			</div>
		</div>
	);
};

export const CountrySelector = () => {
	const {setRoute, setCountry} = useWidgetContext();
	const i18n = useI18n();

	const selectCountry = (country: Country) => {
		setCountry(country);
		setRoute(Routes.DonationForm);
	};

	return (
		<SectionContainer
			renderHeader={
				<span className={sectionTitleCss}>{i18n.countrySelection}</span>
			}
			renderBody={
				<div className={countriesListCss}>
					{Object.keys(supportedCountries).map((country) => (
						<CountryOption
							key={country}
							country={country as Country}
							onClick={selectCountry}
						/>
					))}
				</div>
			}
		/>
	);
};
