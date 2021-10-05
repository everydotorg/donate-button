import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import auFlag from 'src/assets/flags/au.svg';
import gbFlag from 'src/assets/flags/gb.svg';
import globalFlag from 'src/assets/flags/global.svg';
import hkFlag from 'src/assets/flags/hk.svg';
import usFlag from 'src/assets/flags/us.svg';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

const countrySelectedCss = (primaryColor: string) =>
	cxs({
		...bodyText,
		lineHeight: 1.25,
		color: primaryColor,
		margin: Spacing.Empty,
		transform: 'translateY(0.09em)'
	});

const countryFlagCss = cxs({
	height: '16px',
	width: '16px',
	borderRadius: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
	margin: Spacing.Inline_XS
});

const flags: Record<string, string> = {
	GB: gbFlag,
	US: usFlag,
	HK: hkFlag,
	AU: auFlag,
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
