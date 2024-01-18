import {
	cardCss,
	linkCss
} from 'src/components/widget/components/FundraiserLink/styles';
import {GridCard} from 'src/components/widget/components/GridCard';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {BASE_URL, FUNDRAISER_ROUTE} from 'src/constants/url';

export const FundraiserLink = () => {
	const {primaryColor, nonprofitSlug} = useConfigContext();
	const nonprofit = useNonprofitOrError();

	if (nonprofit.metadata?.hideFundraiseButton) {
		return null;
	}

	const href = BASE_URL + nonprofitSlug + '/' + FUNDRAISER_ROUTE;

	return (
		<GridCard className={cardCss}>
			<p>
				<a className={linkCss(primaryColor)} href={href}>
					Start a fundraiser
				</a>{' '}
				to rally your friends and family
			</p>
		</GridCard>
	);
};
