import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import gbFlag from 'src/assets/flags/gb.svg';
import globalFlag from 'src/assets/flags/global.svg';
import usFlag from 'src/assets/flags/us.svg';
import {
	Country,
	supportedCountries
} from 'src/components/widget/constants/supported-countries';
import {COLORS} from 'src/components/widget/theme/colors';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const countrySelectedCss = cxs({
	...labelText,
	color: COLORS.Primary,
	margin: Spacing.Empty,
	transform: 'translateY(0.09em)'
});

const countryFlagCss = cxs({
	height: '1rem',
	width: '1rem',
	borderRadius: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
	margin: Spacing.Inline_XS
});

const flags: Record<Country, string> = {
	GB: gbFlag,
	USA: usFlag,
	OTHER: globalFlag
};

export const CountryTitle = ({country}: {country: Country}) => {
	const countryInfo = supportedCountries[country];
	return (
		<Fragment>
			<img className={countryFlagCss} src={flags[country]} alt="country flag" />
			<p className={countrySelectedCss}>{countryInfo.displayName}</p>
		</Fragment>
	);
};
