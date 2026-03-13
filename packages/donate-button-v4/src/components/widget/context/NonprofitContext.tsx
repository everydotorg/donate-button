import {createContext, FunctionalComponent} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {getCustomization, getNonprofit} from 'src/components/widget/api';
import {
	Nonprofit,
	NonprofitFetchError,
	NonprofitFetching
} from 'src/components/widget/types/Nonprofit';
import {
	DonateFlowCustomization,
	DonateFlowCustomizationFetchError,
	DonateFlowCustomizationFetching
} from 'src/components/widget/types/DonateFlowCustomization';

interface NonprofitContextData {
	nonprofit: Nonprofit | typeof NonprofitFetchError | typeof NonprofitFetching;
	parentNonprofit?: Nonprofit;
	customization:
		| DonateFlowCustomization
		| typeof DonateFlowCustomizationFetching
		| typeof DonateFlowCustomizationFetchError
		| undefined;
}

export const NonprofitContext = createContext<NonprofitContextData>({
	nonprofit: NonprofitFetching,
	customization: DonateFlowCustomizationFetching
});

export const NonprofitContextProvider: FunctionalComponent<{
	nonprofitSlug?: string;
	code?: string;
}> = ({children, nonprofitSlug, code}) => {
	const [nonprofit, setNonprofit] =
		useState<NonprofitContextData['nonprofit']>(NonprofitFetching);
	const [parentNonprofit, setParentNonprofitNonprofit] =
		useState<NonprofitContextData['parentNonprofit']>();
	const [customization, setCustomization] = useState<
		NonprofitContextData['customization']
	>(DonateFlowCustomizationFetching);

	const fetchNonprofit = useCallback(async () => {
		try {
			if (!nonprofitSlug) {
				throw new Error('No nonprofit slug provided');
			}

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

			try {
				const customizationResponse = await getCustomization(response.id, code);
				setCustomization(customizationResponse);
			} catch {
				setCustomization(DonateFlowCustomizationFetchError);
			}
		} catch {
			setNonprofit(NonprofitFetchError);
		}
	}, [nonprofitSlug, code]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchNonprofit();
	}, [fetchNonprofit]);

	return (
		<NonprofitContext.Provider
			value={{nonprofit, parentNonprofit, customization}}
		>
			{children}
		</NonprofitContext.Provider>
	);
};
