import {useContext} from 'preact/hooks';
import {FundraiserContext} from 'src/components/widget/context/FundraiserContext';
import {
	FundraiserFetchError,
	FundraiserFetching
} from 'src/components/widget/types/Fundraiser';

export const useFundraiser = () => useContext(FundraiserContext).fundraiser;

export const useFundraiserOrError = () => {
	const fundraiser = useFundraiser();

	if (
		!fundraiser ||
		fundraiser === FundraiserFetchError ||
		fundraiser === FundraiserFetching
	) {
		// TODO: add more readable error
		throw new Error('Fundraiser error');
	}

	return fundraiser;
};
