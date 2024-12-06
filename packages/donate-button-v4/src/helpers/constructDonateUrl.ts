/* eslint-disable unicorn/prevent-abbreviations */
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	AvailablePaymentMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';
import {
	DonateUrlParameters,
	UTM_QUERY_PARAM
} from 'src/components/widget/types/UrlParams';
import {BASE_URL, GIFT_CARD_URL} from 'src/constants/url';

const UTM_MEDIUM = 'donate-button-0.4'; // Update this if the major version changes
const HASH = 'donate';

interface BaseUrlParams {
	nonprofitSlug: string;
	fundraiserSlug?: string;
	fundraiserId?: string;
	noExit?: boolean;
	methods?: PaymentMethod[];
	privateNote?: string;
	publicTestimony?: string;
	utmSource?: string;
	webhookToken?: string;
	partnerMetadata?: string;
	designation?: string;
	requireShareInfo?: boolean;
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

interface GiftCardUrlParams extends BaseUrlParams {
	giftCardCode?: string;
	redeemGiftCardInFlow?: boolean;
}

function serializeParams(
	params: Record<string, string | number | boolean | undefined>
) {
	return Object.entries(params)
		.filter(([, value]) => Boolean(value))
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
	methods,
	nonprofitSlug,
	noExit,
	privateNote,
	publicTestimony,
	utmSource,
	webhookToken,
	partnerMetadata,
	designation,
	requireShareInfo
}: Pick<
	BaseUrlParams,
	| 'nonprofitSlug'
	| 'methods'
	| 'noExit'
	| 'privateNote'
	| 'publicTestimony'
	| 'utmSource'
	| 'webhookToken'
	| 'partnerMetadata'
	| 'designation'
	| 'requireShareInfo'
>) {
	return {
		[DonateUrlParameters.METHOD]: methods?.join(','),
		[DonateUrlParameters.NO_EXIT]: noExit ?? 1,
		[DonateUrlParameters.PRIVATE_NOTE]: privateNote,
		[DonateUrlParameters.PUBLIC_TESTIMONY]: publicTestimony,
		[DonateUrlParameters.PARTNER_WEBHOOK_TOKEN]: webhookToken,
		[DonateUrlParameters.PARTNER_METADATA]: partnerMetadata,
		[DonateUrlParameters.DESIGNATION]: designation,
		[DonateUrlParameters.REQUIRE_SHARE_INFO]: requireShareInfo,
		[UTM_QUERY_PARAM.utm_campaign]: 'donate-button',
		[UTM_QUERY_PARAM.utm_source]: utmSource ?? nonprofitSlug,
		[UTM_QUERY_PARAM.utm_medium]: UTM_MEDIUM
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
		[DonateUrlParameters.FREQUENCY]: frequency,
		[DonateUrlParameters.AMOUNT]: amount,
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
		[DonateUrlParameters.STOCK_AMOUNT]: stockAmount,
		[DonateUrlParameters.STOCK_SYMBOL]: stockSymbol,
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
		[DonateUrlParameters.CRYPTO_AMOUNT]: cryptoAmount,
		[DonateUrlParameters.CRYPTO_CURRENCY]: cryptoCurrency,
		...params
	});

	return `${baseUrl}?${parameters}#/${HASH}`;
}

export function constructGiftCardUrl({
	redeemGiftCardInFlow,
	giftCardCode,
	...rest
}: GiftCardUrlParams) {
	if (redeemGiftCardInFlow) {
		const baseUrl = getBaseUrl(rest);
		const params = getBaseParams(rest);

		const parameters = serializeParams({
			...params,
			[DonateUrlParameters.GIFT_CARD_CODE]: giftCardCode
		});

		return `${baseUrl}?${parameters}#/${HASH}`;
	}

	const parameters = serializeParams({
		nonprofitSlug: rest.nonprofitSlug
	});

	return `${GIFT_CARD_URL}?${parameters}`;
}
