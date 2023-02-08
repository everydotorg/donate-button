import {Fundraiser} from 'src/components/widget/types/Fundraiser';
import {Nonprofit} from 'src/components/widget/types/Nonprofit';
import {BASE_API_URL} from 'src/constants/url';

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

export async function getNonprofit(nonprofitSlug: string) {
	const data: NonprofitResponse = await fetch(
		`${BASE_API_URL}/${nonprofitSlug}`
	).then(async (response) => response.json());

	return data.data.nonprofit;
}

export async function getFundraiser(
	nonprofitSlug: string,
	fundraiserSlug: string
) {
	const url = `${BASE_API_URL}/${nonprofitSlug}/fundraiser/${fundraiserSlug}`;
	const data: FundraiserResponse = await fetch(url).then(async (response) =>
		response.json()
	);

	return data.data.fundraiser;
}
