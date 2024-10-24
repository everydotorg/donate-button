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
	parentNonprofit?: Nonprofit;
}

export const NonprofitContext = createContext<NonprofitContextData>({
	nonprofit: NonprofitFetching
});

export const NonprofitContextProvider: FunctionalComponent = ({children}) => {
	const {nonprofitSlug} = useConfigContext();
	const [nonprofit, setNonprofit] =
		useState<NonprofitContextData['nonprofit']>(NonprofitFetching);
	const [parentNonprofit, setParentNonprofitNonprofit] =
		useState<NonprofitContextData['parentNonprofit']>();

	const fetchNonprofit = useCallback(async () => {
		try {
			const response = await getNonprofit(nonprofitSlug);
			setNonprofit(response);

			const parentNonprofitId =
				response.eligibleDonationRecipientNonprofitIds?.length === 1
					? response.eligibleDonationRecipientNonprofitIds[0]
					: undefined;

			if (parentNonprofitId) {
				try {
					const response = await getNonprofit(parentNonprofitId);
					setParentNonprofitNonprofit(response);
				} catch {
					setParentNonprofitNonprofit(undefined);
				}
			}
		} catch {
			setNonprofit(NonprofitFetchError);
		}
	}, [nonprofitSlug]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchNonprofit();
	}, [fetchNonprofit]);

	return (
		<NonprofitContext.Provider value={{nonprofit, parentNonprofit}}>
			{children}
		</NonprofitContext.Provider>
	);
};
