import {Fragment} from 'preact/jsx-runtime';
import {GridCard} from 'src/components/widget/components/GridCard';
import {
	textContainerCss,
	smallCardCss,
	smallLogoImageCss,
	nonprofitNameCss,
	locationAddressCss,
	largeCardCss,
	headerContainerCss,
	largeLogoImageCss,
	descriptionCss
} from 'src/components/widget/components/NonprofitInfo/styles';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {
	COVER_IMAGE_PLACEHOLDER_ID,
	LOGO_IMAGE_PLACEHOLDER_ID
} from 'src/constants/placeholders';
import {getCloudinaryUrl} from 'src/helpers/getCloudinaryUrl';

const SmallNonprofitInfo = () => {
	const {name, locationAddress, logoCloudinaryId} = useNonprofitOrError();

	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	return (
		<GridCard className={smallCardCss}>
			{logoUrl && (
				<div alt="nonprofit logo" className={smallLogoImageCss(logoUrl)} />
			)}
			<div>
				<h1 className={nonprofitNameCss}>{name}</h1>
				{locationAddress && (
					<h2 className={locationAddressCss}>{locationAddress}&nbsp;</h2>
				)}
			</div>
		</GridCard>
	);
};

const LargeNonprofitInfo = () => {
	const {
		name,
		locationAddress,
		logoCloudinaryId,
		coverImageCloudinaryId,
		description
	} = useNonprofitOrError();
	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	const coverImageUrl = getCloudinaryUrl(
		coverImageCloudinaryId ?? COVER_IMAGE_PLACEHOLDER_ID
	);
	return (
		<GridCard className={largeCardCss}>
			{coverImageUrl && (
				<div className={headerContainerCss(coverImageUrl)}>
					{logoUrl && (
						<div alt="nonprofit logo" className={largeLogoImageCss(logoUrl)} />
					)}
				</div>
			)}
			<div className={textContainerCss}>
				<h1 className={nonprofitNameCss}>{name}</h1>
				{locationAddress && (
					<h2 className={locationAddressCss}>{locationAddress}&nbsp;</h2>
				)}
				{description && <p className={descriptionCss}>{description}</p>}
			</div>
		</GridCard>
	);
};

export const NonprofitCard = () => (
	<Fragment>
		<LargeNonprofitInfo />
		<SmallNonprofitInfo />
	</Fragment>
);
