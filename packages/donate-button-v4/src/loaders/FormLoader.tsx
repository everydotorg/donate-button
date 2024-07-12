import {PaymentProcess} from 'src/components/widget/components/PaymentProcess';
import {ContextProvider} from 'src/components/widget/context';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useFundraiser} from 'src/components/widget/hooks/useFundraiser';
import {useNonprofit} from 'src/components/widget/hooks/useNonprofit';
import {LoadingIcon} from 'src/components/widget/icons/LoadingIcon';
import {FundraiserFetching} from 'src/components/widget/types/Fundraiser';
import {NonprofitFetching} from 'src/components/widget/types/Nonprofit';
import {WidgetConfig} from 'src/components/widget/types/WidgetConfig';

interface FormLoaderProps {
	options: Partial<WidgetConfig>;
}

export const FormLoader = ({options = {}}: FormLoaderProps) => {
	return (
		<ContextProvider
			options={options}
			hide={() => {
				// do nothing
			}}
		>
			<Form />
		</ContextProvider>
	);
};

const Form = () => {
	const {fundraiserSlug} = useConfigContext();
	const findraiser = useFundraiser();
	const nonprofit = useNonprofit();

	if (
		nonprofit === NonprofitFetching ||
		(fundraiserSlug && findraiser === FundraiserFetching)
	) {
		return <LoadingIcon size={24} />;
	}

	return <PaymentProcess />;
};
