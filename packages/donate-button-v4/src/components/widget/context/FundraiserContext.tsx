import {createContext, FunctionalComponent} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {getFundraiser} from 'src/components/widget/api';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {
	Fundraiser,
	FundraiserFetchError,
	FundraiserFetching
} from 'src/components/widget/types/Fundraiser';
interface FundraiserContextData {
	fundraiser?:
		| Fundraiser
		| typeof FundraiserFetchError
		| typeof FundraiserFetching;
}

export const FundraiserContext = createContext<FundraiserContextData>({
	fundraiser: FundraiserFetching
});

export const FundraiserContextProvider: FunctionalComponent = ({children}) => {
	const {fundraiserSlug, nonprofitSlug} = useConfigContext();
	const [fundraiser, setFundraiser] =
		useState<FundraiserContextData['fundraiser']>(FundraiserFetching);

	const fetchFundraiser = useCallback(async () => {
		if (!fundraiserSlug) {
			setFundraiser(undefined);
			return;
		}

		try {
			const response = await getFundraiser(nonprofitSlug, fundraiserSlug);
			setFundraiser(response);
		} catch {
			setFundraiser(FundraiserFetchError);
		}
	}, [nonprofitSlug, fundraiserSlug]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchFundraiser();
	}, [fetchFundraiser]);

	return (
		<FundraiserContext.Provider value={{fundraiser}}>
			{children}
		</FundraiserContext.Provider>
	);
};
