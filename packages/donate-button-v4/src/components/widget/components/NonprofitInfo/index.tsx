import {FundraiserCard} from 'src/components/widget/components/NonprofitInfo/FundraiserCard';
import {NonprofitCard} from 'src/components/widget/components/NonprofitInfo/NonprofitCard';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const NonprofitInfo = () => {
	const {fundraiserSlug} = useConfigContext();

	if (fundraiserSlug) {
		return <FundraiserCard />;
	}

	return <NonprofitCard />;
};
