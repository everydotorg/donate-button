import {DonationFrequency} from 'src/components/widget/types/donation-frequency';

const UTM_MEDIUM = 'donate-button-0.3'; // Update this if the major version changes

type Params = {
	nonprofitSlug: string;
	crypto: boolean;
	fundraiserSlug?: string;
	fundraiserId?: string;
	frequency?: DonationFrequency;
	amount?: number;
	noExit?: boolean;
};

function serializeParams(params: Object) {
	return Object.entries(params)
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.map((part) => encodeURIComponent(part!)).join('='))
		.join('&');
}

function constructEveryUrl({
	nonprofitSlug,
	fundraiserId,
	fundraiserSlug,
	crypto,
	frequency,
	noExit,
	amount
}: Params) {
	if (fundraiserId && fundraiserSlug) {
		const baseUrl = `https://www.every.org/${nonprofitSlug}/f/${fundraiserSlug}`;

		const params = serializeParams({
			frequency,
			amount,
			donateTo: nonprofitSlug,
			fundraiser_id: fundraiserId
		});

		return baseUrl + '?' + params;
	}

	const baseUrl = `https://www.every.org/${nonprofitSlug}/donate${
		crypto ? '/crypto' : ''
	}`;

	const parameters = serializeParams({
		frequency,
		amount,
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM,
		no_exit: noExit ?? 1
	});

	return `${baseUrl}?${parameters}`;
}

export default constructEveryUrl;
