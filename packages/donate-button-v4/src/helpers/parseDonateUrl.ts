import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	AvailablePaymentMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';
import {
	DonateUrlParameters,
	UTM_QUERY_PARAM
} from 'src/components/widget/types/UrlParams';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

const MAX_AMOUNT_SUGGESTIONS = 5;

/**
 * Just for backwards compatibility
 * @deprecated
 */
enum OLD_DonateUrlParameters {
	MIN_AMOUNT = 'minAmount',
	THEME_COLOR = 'themeColor'
}

function methodsFromString(string?: string | null) {
	if (!string) return;
	return string
		.split(',')
		.filter((method): method is PaymentMethod =>
			AvailablePaymentMethods.includes(method as PaymentMethod)
		);
}

function frequencyFromString(string?: string | null) {
	if (!string) return;
	return Object.values(DonationFrequency).find(
		(frequency) => frequency.toUpperCase() === string.toUpperCase()
	);
}

function addAmountsFromString(string?: string | null) {
	if (!string) return;
	return (
		string
			.split(',')
			// eslint-disable-next-line unicorn/no-array-callback-reference
			.map(Number.parseFloat)
			.filter(Boolean)
			.slice(0, MAX_AMOUNT_SUGGESTIONS)
	);
}

function intFromString(string?: string | null) {
	if (!string) return;
	const number = Number.parseInt(string, 10);
	return Number.isNaN(number) ? undefined : number;
}

function booleanFromString(string?: string | null) {
	if (!string) return;
	return string === 'true';
}

function removeEmptyValues<T extends Record<string, unknown>>(object: T): T {
	return Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined)
	) as T;
}

export function parseDonateUrl(
	urlString: string
): (Partial<WidgetConfig> & {nonprofitSlug: string}) | undefined {
	const url = new URL(urlString);

	const fundraiserSlug = url.pathname.split('/f/')[1];
	const nonprofitSlug = url.pathname.split('/')[1];

	const searchParameters = new URLSearchParams(url.search);
	const methods = methodsFromString(
		searchParameters.get(DonateUrlParameters.METHOD)
	);
	const frequency = frequencyFromString(
		searchParameters.get(DonateUrlParameters.FREQUENCY)
	);
	const amount = intFromString(
		searchParameters.get(DonateUrlParameters.AMOUNT)
	);
	const monthlyTitle =
		searchParameters.get(DonateUrlParameters.MONTHLY_TITLE) ?? undefined;

	const addAmounts = addAmountsFromString(
		searchParameters.get(DonateUrlParameters.SUGGESTED_AMOUNTS)
	);
	const utmSource =
		searchParameters.get(UTM_QUERY_PARAM.utm_source) ?? undefined;

	const minAmount =
		intFromString(searchParameters.get(DonateUrlParameters.MIN_VALUE)) ??
		intFromString(searchParameters.get(OLD_DonateUrlParameters.MIN_AMOUNT));

	const designation =
		searchParameters.get(DonateUrlParameters.DESIGNATION) ?? undefined;

	const requireShareInfo = booleanFromString(
		searchParameters.get(DonateUrlParameters.REQUIRE_SHARE_INFO)
	);

	const primaryColorFromUrl =
		searchParameters.get(DonateUrlParameters.THEME_COLOR) ??
		searchParameters.get(OLD_DonateUrlParameters.THEME_COLOR) ??
		undefined;
	const primaryColor = primaryColorFromUrl
		? primaryColorFromUrl.startsWith('#')
			? primaryColorFromUrl
			: `#${primaryColorFromUrl}`
		: undefined;

	if (!nonprofitSlug) {
		return;
	}

	return removeEmptyValues({
		fundraiserSlug,
		nonprofitSlug,
		frequency,
		defaultFrequency: frequency,
		methods,
		monthlyTitle,
		addAmounts,
		utmSource,
		amount,
		defaultDonationAmount: amount,
		minDonationAmount: minAmount,
		primaryColor,
		designation,
		requireShareInfo
	});
}
