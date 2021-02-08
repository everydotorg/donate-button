import {DonationLevel, I18NDonationLevel} from 'src/helpers/options-types';

export const getCustomDonationLevel = (
	monthlyLevels: readonly I18NDonationLevel[],
	donationAmount: string
) => {
	const sorted = [...monthlyLevels].sort(
		(a, b) => Number(a.amount) - Number(b.amount)
	);
	if (Number.isNaN(Number(donationAmount))) {
		return sorted[0];
	}

	return sorted[
		Math.max(
			0,
			sorted.findIndex(
				(level) => Number(level.amount) > Number(donationAmount)
			) - 1
		)
	];
};
