import {useContext} from 'preact/hooks';
import {NonprofitContext} from 'src/components/widget/context/NonprofitContext';
import {
	NonprofitFetchError,
	NonprofitFetching
} from 'src/components/widget/types/Nonprofit';

export const useNonprofit = () => useContext(NonprofitContext).nonprofit;

export const useParentNonprofit = () =>
	useContext(NonprofitContext).parentNonprofit;

export const useNonprofitOrError = () => {
	const nonprofit = useNonprofit();

	if (nonprofit === NonprofitFetchError || nonprofit === NonprofitFetching) {
		// TODO: add more readable error
		throw new Error('Nonprofit error');
	}

	return nonprofit;
};
