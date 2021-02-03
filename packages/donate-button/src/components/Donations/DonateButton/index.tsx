import {useContext} from 'preact/hooks';
import { DonationFrequency } from 'src/helpers/options-types';

import DonationsContext from 'src/contexts/donationsContext';
import OptionsContext from 'src/contexts/optionsContext';
import {replaceKeys} from 'src/helpers/interpolation';
import useI18n from 'src/hooks/useI18n';
import Button from 'src/components/Button';

const constructEveryUrl = (company: string, frequency: DonationFrequency, amount: number, mode: DonationMode, extras: Record<string, string>) => {
	const baseUrl = `https://www.every.org/${company}/donate?frequency=${frequency}&amount=${amount}&utm_campaign=single-or-split&utm_content=${mode.toLowerCase()}&utm_source=${company}&utm_medium=every-month`;
	const extraParameters = Object.keys(extras).reduce((previous, key) => {
		return previous.concat(`&${key}=${extras[key]}`);
	}, '');

	return `${baseUrl}${extraParameters}`;
};

const getButtonTextFormatted = (amount: number, text: string, currency: string) => {
	if (amount && !isNaN(amount)) {
		return replaceKeys({amount: `$${amount} ${currency}`}, text);
	}

	return replaceKeys({amount: ''}, text);
};

interface DonateButtonProps {
	extraClasses?: string[]
	monthlyDonation: boolean
}
const DonateButton = ({monthlyDonation, extraClasses = []}: DonateButtonProps) => {
	const lang = useI18n();
	const {donationAmount} = useContext(DonationsContext);
	const {onSubmit, currency, mode} = useContext(OptionsContext);
	const formText = monthlyDonation ? lang.monthly : lang.oneTime;

	const handleDonateButton = (mode) => {
		if (!isNaN(donationAmount)) {
			const frequency = monthlyDonation ? 'MONTHLY' : 'ONCE';

			if (typeof onSubmit === "function") {
				onSubmit({amount: donationAmount, frequency});
			} else {
				const url = constructEveryUrl(
					onSubmit.charity,
					frequency,
					donationAmount,
					mode,
					onSubmit.params
				);
				window.location.href = url;
			}
		}
	};

	return (
		<Button
			extraClasses={extraClasses}
			handleClick={() => {
				handleDonateButton(mode);
			}}
		>
			{getButtonTextFormatted(donationAmount, formText.button, currency)}
		</Button>
	);
};

export default DonateButton;
