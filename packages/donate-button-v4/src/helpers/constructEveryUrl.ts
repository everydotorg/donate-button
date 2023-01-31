/* eslint-disable unicorn/prevent-abbreviations */
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {BASE_URL} from 'src/constants/url';

const UTM_MEDIUM = 'donate-button-0.4'; // Update this if the major version changes

type Params = {
	nonprofitSlug: string;
	fundraiserSlug?: string;
	fundraiserId?: string;
	frequency?: DonationFrequency;
	method?: PaymentMethod;
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
	frequency,
	method,
	noExit,
	amount
}: Params) {
	const hash = 'donate';

	let baseUrl = BASE_URL + nonprofitSlug;

	if (fundraiserSlug) {
		baseUrl += '/f/' + fundraiserSlug;
	}

	const parameters = serializeParams({
		frequency,
		amount,
		method,
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM,
		no_exit: noExit ?? 1
	});

	return `${baseUrl}?${parameters}#/${hash}`;
}

export default constructEveryUrl;
