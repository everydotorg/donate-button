import {useContext} from 'preact/hooks';
import {FundraiserContext} from 'src/components/widget/context/FundraiserContext';
import {
	FundraiserFetchError,
	FundraiserFetching
} from 'src/components/widget/types/Fundraiser';

export const useFundraiser = () => useContext(FundraiserContext).fundraiser;

export const useFundraiserOrUndefined = () => {
	const fundraiser = useFundraiser();

	if (
		fundraiser === FundraiserFetchError ||
		fundraiser === FundraiserFetching
	) {
		return undefined;
	}

	return fundraiser;
};
