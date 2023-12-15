import {FundraiserCard} from 'src/components/widget/components/NonprofitInfo/FundraiserCard';
import {NonprofitCard} from 'src/components/widget/components/NonprofitInfo/NonprofitCard';
import {useFundraiserOrUndefined} from 'src/components/widget/hooks/useFundraiser';

export const NonprofitInfo = () => {
	const fundraiser = useFundraiserOrUndefined();

	if (fundraiser) {
		return <FundraiserCard fundraiser={fundraiser} />;
	}

	return <NonprofitCard />;
};
