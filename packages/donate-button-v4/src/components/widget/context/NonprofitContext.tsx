import {createContext, FunctionalComponent} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {getNonprofit} from 'src/components/widget/api';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {
	Nonprofit,
	NonprofitFetchError,
	NonprofitFetching
} from 'src/components/widget/types/Nonprofit';

interface NonprofitContextData {
	nonprofit: Nonprofit | typeof NonprofitFetchError | typeof NonprofitFetching;
}

export const NonprofitContext = createContext<NonprofitContextData>({
	nonprofit: NonprofitFetching
});

export const NonprofitContextProvider: FunctionalComponent = ({children}) => {
	const {nonprofitSlug} = useConfigContext();
	const [nonprofit, setNonprofit] =
		useState<NonprofitContextData['nonprofit']>(NonprofitFetching);

	const fetchNonprofit = useCallback(async () => {
		try {
			const response = await getNonprofit(nonprofitSlug);
			setNonprofit(response);
		} catch {
			setNonprofit(NonprofitFetchError);
		}
	}, [nonprofitSlug]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchNonprofit();
	}, [fetchNonprofit]);

	return (
		<NonprofitContext.Provider value={{nonprofit}}>
			{children}
		</NonprofitContext.Provider>
	);
};
