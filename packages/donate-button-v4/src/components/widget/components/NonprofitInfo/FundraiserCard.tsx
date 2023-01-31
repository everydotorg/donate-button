// TODO: Implement fundraiser card design

import {Fragment} from 'preact/jsx-runtime';
import {GridCard} from 'src/components/widget/components/GridCard';
import {
	textContainerCss,
	smallCardCss,
	nonprofitNameCss,
	largeCardCss,
	headerContainerCss,
	descriptionCss,
	smallLogoImageCss
} from 'src/components/widget/components/NonprofitInfo/styles';
import {useFundraiserOrError} from 'src/components/widget/hooks/useFundraiser';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {LOGO_IMAGE_PLACEHOLDER_ID} from 'src/constants/placeholders';
import {getCloudinaryUrl} from 'src/helpers/getCloudinaryUrl';

const SmallFundraiserInfo = () => {
	const {title} = useFundraiserOrError();

	const {logoCloudinaryId} = useNonprofitOrError();
	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	return (
		<GridCard className={smallCardCss}>
			{logoUrl && (
				<div alt="nonprofit logo" className={smallLogoImageCss(logoUrl)} />
			)}
			<div>
				<h1 className={nonprofitNameCss}>{title}</h1>
			</div>
		</GridCard>
	);
};

const LargeFundraiserInfo = () => {
	const {title, coverImageCloudinaryId, description} = useFundraiserOrError();

	const coverImageUrl =
		coverImageCloudinaryId && getCloudinaryUrl(coverImageCloudinaryId);

	return (
		<GridCard className={largeCardCss}>
			{coverImageUrl && <div className={headerContainerCss(coverImageUrl)} />}
			<div className={textContainerCss}>
				<h1 className={nonprofitNameCss}>{title}</h1>
				{description && <p className={descriptionCss}>{description}</p>}
			</div>
		</GridCard>
	);
};

export const FundraiserCard = () => (
	<Fragment>
		<LargeFundraiserInfo />
		<SmallFundraiserInfo />
	</Fragment>
);
