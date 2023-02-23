/* eslint-disable unicorn/prevent-abbreviations */
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import {BASE_URL} from 'src/constants/url';

const UTM_MEDIUM = 'donate-button-0.4'; // Update this if the major version changes
const HASH = 'donate';

interface BaseUrlParams {
	nonprofitSlug: string;
	fundraiserSlug?: string;
	fundraiserId?: string;
	noExit?: boolean;
	method?: PaymentMethod;
}

interface DonateUrlParams extends BaseUrlParams {
	frequency: DonationFrequency;
	amount: number;
}

interface DonateStocksUrlParams extends BaseUrlParams {
	stockAmount: number;
	stockSymbol: string;
}

interface DonateCryptoUrlParams extends BaseUrlParams {
	cryptoAmount: number;
	cryptoCurrency: string;
}

function serializeParams(
	params: Record<string, string | number | boolean | undefined>
) {
	return Object.entries(params)
		.filter(([_, value]) => Boolean(value))
		.map((entry) => entry.map((part) => encodeURIComponent(part!)).join('='))
		.join('&');
}

function getBaseUrl({
	fundraiserSlug,
	nonprofitSlug
}: Pick<BaseUrlParams, 'nonprofitSlug' | 'fundraiserSlug'>) {
	let baseUrl = BASE_URL + nonprofitSlug;

	if (fundraiserSlug) {
		baseUrl += '/f/' + fundraiserSlug;
	}

	return baseUrl;
}

function getBaseParams({
	method,
	nonprofitSlug,
	noExit
}: Pick<BaseUrlParams, 'nonprofitSlug' | 'method' | 'noExit'>) {
	return {
		method,
		utm_campaign: 'donate-button',
		utm_source: nonprofitSlug,
		utm_medium: UTM_MEDIUM,
		no_exit: noExit ?? 1
	};
}

export function constructBasicDonateUrl(
	// eslint-disable-next-line @typescript-eslint/ban-types
	props: Omit<DonateUrlParams, 'frequency' | 'amount'>
) {
	const baseUrl = getBaseUrl(props);
	const params = getBaseParams(props);

	const parameters = serializeParams(params);

	return `${baseUrl}?${parameters}#/${HASH}`;
}

export function constructDonateUrl({
	frequency,
	amount,
	...rest
}: DonateUrlParams) {
	const baseUrl = getBaseUrl(rest);
	const params = getBaseParams(rest);

	const parameters = serializeParams({
		frequency,
		amount,
		...params
	});

	return `${baseUrl}?${parameters}#/${HASH}`;
}

export function constructDonateStocksUrl({
	stockAmount,
	stockSymbol,
	...rest
}: DonateStocksUrlParams) {
	const baseUrl = getBaseUrl(rest);
	const params = getBaseParams(rest);

	const parameters = serializeParams({
		stock_amount: stockAmount,
		stock_symbol: stockSymbol,
		...params
	});

	return `${baseUrl}?${parameters}#/${HASH}`;
}

export function constructDonateCryptoUrl({
	cryptoAmount,
	cryptoCurrency,
	...rest
}: DonateCryptoUrlParams) {
	const baseUrl = getBaseUrl(rest);
	const params = getBaseParams(rest);

	const parameters = serializeParams({
		crypto_amount: cryptoAmount,
		crypto_currency: cryptoCurrency,
		...params
	});

	return `${baseUrl}?${parameters}#/${HASH}`;
}
