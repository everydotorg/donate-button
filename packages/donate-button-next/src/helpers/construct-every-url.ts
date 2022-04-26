/* eslint-disable unicorn/prevent-abbreviations */
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

function serializeParams(
	params: Record<string, string | number | boolean | undefined>
) {
	return Object.entries(params)
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.map((part) => encodeURIComponent(part!)).join('='))
		.join('&');
}

function constructEveryUrl({
	nonprofitSlug,
	fundraiserSlug,
	crypto,
	frequency,
	noExit,
	amount
}: Params) {
	const hash = crypto ? 'donate-crypto' : 'donate';

	let baseUrl = 'https://www.every.org/' + nonprofitSlug;

	if (fundraiserSlug) {
		baseUrl += '/f/' + fundraiserSlug;
	}

	const parameters = serializeParams({
		frequency,
		amount,
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM,
		no_exit: noExit ?? 1
	});

	return `${baseUrl}?${parameters}#${hash}`;
}

export default constructEveryUrl;
