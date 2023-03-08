import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';

export function frequencyFromString(string?: string | null) {
	if (!string) {
		return;
	}

	return Object.values(DonationFrequency).find(
		(frequency) => frequency.toUpperCase() === string.toUpperCase()
	);
}
