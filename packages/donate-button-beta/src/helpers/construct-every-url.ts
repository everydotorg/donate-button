import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

const UTM_MEDIUM = 'donate-button-0.3'; // Update this if the major version changes

function constructEveryUrl({
	nonprofitSlug,
	crypto,
	frequency,
	amount
}: {
	nonprofitSlug: string;
	crypto: boolean;
	frequency?: DonationFrequency;
	amount?: number;
}) {
	const baseUrl = `https://www.every.org/${nonprofitSlug}/donate${
		crypto ? '/crypto' : ''
	}`;
	const parameters = Object.entries({
		frequency,
		amount,
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM,
		no_exit: 1
	})
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.map((part) => encodeURIComponent(part!)).join('='))
		.join('&');

	return `${baseUrl}?${parameters}`;
}

export default constructEveryUrl;
