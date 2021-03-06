import {Fragment} from 'preact';
import {useContext, useLayoutEffect, useRef} from 'preact/hooks';
import DonationsContext from 'src/contexts/donations-context';
import OptionsContext from 'src/contexts/options-context';
import {getCustomDonationLevel} from 'src/helpers/donation-level';
import {replaceTagWithComponent} from 'src/helpers/interpolation';
import {I18NOptions} from 'src/helpers/options-types';
import useI18n from 'src/hooks/use-i18n';

import 'src/components/Description/description.css';

const getBoldFormatted = (text: string) => {
	const props = {};
	const tag = 'bold';

	return replaceTagWithComponent(
		text,
		tag,
		(props) => <strong {...props} />,
		props
	);
};

const getDescriptionText = (
	lang: I18NOptions | undefined,
	monthlyDonation: boolean,
	donationAmount?: string,
	customDonation?: string
) => {
	if (!lang) {
		return null;
	}

	if (monthlyDonation) {
		const level = lang.monthly.levels
			? !donationAmount || customDonation
				? lang.monthly.custom
				: getCustomDonationLevel(lang.monthly.levels, donationAmount)
			: undefined;

		if (!level) {
			return null;
		}

		if (!('description1' in level) || !('description2' in level)) {
			return null;
		}

		return (
			<Fragment>
				<p className="t-heading-secondary">
					{level.description1 && getBoldFormatted(level.description1)}
				</p>
				{level.description2 && (
					<p className="t-heading-secondary">{level.description2}</p>
				)}
			</Fragment>
		);
	}

	return <p className="t-heading-secondary">{lang.oneTime.description}</p>;
};

const Description = ({monthlyBgColor}: {monthlyBgColor?: string}) => {
	const descrRef = useRef<HTMLDivElement | null>(null);
	const donationsContextValue = useContext(DonationsContext);
	const options = useContext(OptionsContext);
	const i18nOptions = useI18n();

	useLayoutEffect(() => {
		if (!descrRef.current || !donationsContextValue) {
			return;
		}

		const {monthlyDonation} = donationsContextValue;
		if (monthlyDonation && monthlyBgColor) {
			// DescrRef.current.style.background = getCustomDonationLevel(options.monthly.levels, donationAmount).bgColor;
			descrRef.current.style.background = monthlyBgColor;
		} else if (options.oneTime.bgColor) {
			descrRef.current.style.background = options.oneTime.bgColor;
		}
	}, [options.oneTime.bgColor, donationsContextValue, monthlyBgColor]);

	if (!donationsContextValue) {
		return null;
	}

	const {
		donationAmount,
		monthlyDonation,
		customDonation
	} = donationsContextValue;

	return (
		<div ref={descrRef} className="description">
			{getDescriptionText(
				i18nOptions,
				monthlyDonation,
				donationAmount,
				customDonation
			)}
		</div>
	);
};

export default Description;
