import cxs from 'cxs';
import {JSXInternal} from 'preact/src/jsx';
import {Faq} from 'src/components/widget/components/Faq';
import {Footer} from 'src/components/widget/components/Footer';
import {FundraiserLink} from 'src/components/widget/components/FundraiserLink';
import {Grid} from 'src/components/widget/components/Grid';
import {Header} from 'src/components/widget/components/Header';
import {NonprofitInfo} from 'src/components/widget/components/NonprofitInfo';
import {PaymentProcess} from 'src/components/widget/components/PaymentProcess';
import {WidgetCard} from 'src/components/widget/components/WidgetCard';
import {WidgetOverlay} from 'src/components/widget/components/WidgetOverlay';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useFundraiser} from 'src/components/widget/hooks/useFundraiser';
import {useNonprofit} from 'src/components/widget/hooks/useNonprofit';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {LoadingIcon} from 'src/components/widget/icons/LoadingIcon';
import {
	FundraiserFetchError,
	FundraiserFetching
} from 'src/components/widget/types/Fundraiser';
import {
	NonprofitFetchError,
	NonprofitFetching
} from 'src/components/widget/types/Nonprofit';

cxs.prefix('edoWidget-');

const Widget = () => {
	const {fundraiserSlug} = useConfigContext();
	const {hideWidget} = useWidgetContext();
	const findraiser = useFundraiser();
	const nonprofit = useNonprofit();

	const hideOnWrapperClick: JSXInternal.MouseEventHandler<Element> = (
		event
	) => {
		if (event.target === event.currentTarget) {
			hideWidget();
		}
	};

	if (
		nonprofit === NonprofitFetchError ||
		(fundraiserSlug && findraiser === FundraiserFetchError)
	) {
		// TODO: Redirect
		return null;
	}

	if (
		nonprofit === NonprofitFetching ||
		(fundraiserSlug && findraiser === FundraiserFetching)
	) {
		return (
			<WidgetOverlay onClick={hideOnWrapperClick}>
				<LoadingIcon size={24} />
			</WidgetOverlay>
		);
	}

	return (
		<WidgetOverlay onClick={hideOnWrapperClick}>
			<WidgetCard height={null}>
				<Grid>
					<div id="edo-header">
						<Header />
					</div>
					<div id="edo-nonprofitInfo">
						<NonprofitInfo />
					</div>
					<div id="edo-paymentProcess">
						<PaymentProcess />
					</div>
					<div id="edo-faq">
						<Faq />
					</div>
					<div id="edo-fundraiserLink">
						<FundraiserLink />
					</div>
					<div id="edo-footer">
						<Footer />
					</div>
				</Grid>
			</WidgetCard>
		</WidgetOverlay>
	);
};

export default Widget;
