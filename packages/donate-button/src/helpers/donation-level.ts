export const getCustomDonationLevel = (monthlyLevels: {amount: string}[], donationAmount: string) => {
	return monthlyLevels.reduce((level, currentlevel) => {
		if (
			Number.parseInt(currentlevel.amount, 10) <=
			Number.parseInt(donationAmount, 10)
		) {
			return currentlevel;
		}

		return level;
	});
};
