import {DonateFlowCustomization} from 'src/components/widget/types/DonateFlowCustomization';
import {Fundraiser} from 'src/components/widget/types/Fundraiser';
import {Nonprofit} from 'src/components/widget/types/Nonprofit';
import {BASE_API_URL, BASE_COINGECKO_URL, STAGING_API_URL} from 'src/constants/url';

type NonprofitResponse = {
	message: string;
	data: {
		nonprofit: Nonprofit;
	};
};

type FundraiserResponse = {
	data: {
		fundraiser: Fundraiser;
		nonprofits: Nonprofit[];
	};
};

export async function getNonprofit(nonprofitSlug: string, staging?: boolean) {
	const apiUrl = staging ? STAGING_API_URL : BASE_API_URL;
	const data: NonprofitResponse = await fetch(
		`${apiUrl}/${nonprofitSlug}`
	).then(async (response) => response.json());

	return data.data.nonprofit;
}

export async function getFundraiser(
	nonprofitSlug: string,
	fundraiserSlug: string,
	staging?: boolean
) {
	const apiUrl = staging ? STAGING_API_URL : BASE_API_URL;
	const url = `${apiUrl}/${nonprofitSlug}/fundraiser/${fundraiserSlug}`;
	const data: FundraiserResponse = await fetch(url).then(async (response) =>
		response.json()
	);

	return data.data.fundraiser;
}

interface CoingeckoData {
	market_data: {
		current_price: {
			usd: number;
		};
	};
}

export async function getCoingeckoRate(coingeckoId: string) {
	const url = `${BASE_COINGECKO_URL}/coins/${coingeckoId}`;
	const data = await fetch(url).then(async (response) => response.json());

	return (data as CoingeckoData).market_data.current_price.usd;
}

export async function getCustomization(
	nonprofitId: string,
	code?: string,
	staging?: boolean
) {
	const apiUrl = staging ? STAGING_API_URL : BASE_API_URL;
	const url = `${apiUrl}/${nonprofitId}/customization${
		code ? `?code=${code}` : ''
	}`;
	const response = await fetch(url).then(async (response) => {
		const body = await response.text();

		if (!body) {
			return undefined;
		}

		try {
			return JSON.parse(body) as DonateFlowCustomization;
		} catch {
			return undefined;
		}
	});
	return response;
}
