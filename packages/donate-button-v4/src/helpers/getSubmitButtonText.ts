import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {DEFAULT_CURRENCY} from 'src/constants/currency';

export const getSubmitButtonText = (
	donationAmount: number | undefined,
	frequency: DonationFrequency
) => {
	if (frequency === '') {
		return 'Select frequency';
	}

	if (!donationAmount) {
		return 'Choose an amount';
	}

	if (Number.isNaN(donationAmount)) {
		return 'Enter an amount to donate';
	}

	let text = `Donate ${DEFAULT_CURRENCY.symbol}${donationAmount}`;

	if (frequency === DonationFrequency.Monthly) {
		text = text.concat(` monthly`);
	}

	return text;
};
