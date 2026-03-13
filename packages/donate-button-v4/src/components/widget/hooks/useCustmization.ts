import {useContext} from 'preact/hooks';
import {NonprofitContext} from 'src/components/widget/context/NonprofitContext';
import {
	DonateFlowCustomizationFetchError,
	DonateFlowCustomizationFetching
} from 'src/components/widget/types/DonateFlowCustomization';

export const useCustomization = () =>
	useContext(NonprofitContext).customization;

export const useCustomizationOrUndefined = () => {
	const customization = useCustomization();

	if (
		customization === DonateFlowCustomizationFetchError ||
		customization === DonateFlowCustomizationFetching
	) {
		return undefined;
	}

	return customization;
};
