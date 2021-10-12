import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import auFlag from 'src/assets/flags/au.svg';
import gbFlag from 'src/assets/flags/gb.svg';
import globalFlag from 'src/assets/flags/global.svg';
import hkFlag from 'src/assets/flags/hk.svg';
import usFlag from 'src/assets/flags/us.svg';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';

const titleCss = cxs({
	...bodyText
});

const countryFlagCss = cxs({
	height: '16px',
	width: '16px',
	borderRadius: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
	margin: 0,
	padding: 0
});

const flags: Record<string, string> = {
	UK: gbFlag,
	US: usFlag,
	HK: hkFlag,
	AU: auFlag,
	OTHER: globalFlag
};

const getFlag = (countryCode: string) => {
	const flag = flags[countryCode];

	return flag ? flag : flags.OTHER;
};

type CountryTitleProps = {
	country: DonationRecipient;
};

export const CountryTitle = ({country}: CountryTitleProps) => {
	return (
		<Fragment>
			<img
				className={countryFlagCss}
				src={getFlag(country?.countryCode)}
				alt="country flag"
			/>

			<span className={titleCss}>{country?.name}</span>
		</Fragment>
	);
};
