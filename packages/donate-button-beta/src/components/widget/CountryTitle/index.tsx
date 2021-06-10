import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import gbFlag from 'src/assets/flags/gb.svg';
import globalFlag from 'src/assets/flags/global.svg';
import usFlag from 'src/assets/flags/us.svg';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {labelText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

const countrySelectedCss = (primaryColor: string) =>
	cxs({
		...labelText,
		color: primaryColor,
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

const flags: Record<string, string> = {
	GB: gbFlag,
	US: usFlag,
	OTHER: globalFlag
};

const getFlag = (countryCode: string) => {
	const flag = flags[countryCode];

	return flag ? flag : flags.OTHER;
};

export const CountryTitle = ({country}: {country: DonationRecipient}) => {
	const {primaryColor} = useConfigContext();

	return (
		<Fragment>
			<img
				className={countryFlagCss}
				src={getFlag(country?.countryCode)}
				alt="country flag"
			/>
			<p className={countrySelectedCss(primaryColor)}>{country?.name}</p>
		</Fragment>
	);
};
