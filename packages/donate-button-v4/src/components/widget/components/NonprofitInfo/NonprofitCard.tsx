import {Fragment} from 'preact/jsx-runtime';
import {GridCard} from 'src/components/widget/components/GridCard';
import {
	logoImageCss,
	nonprofitNameCss,
	descriptionCss,
	avatarAndNameWrapperCss,
	cardCss
} from 'src/components/widget/components/NonprofitInfo/styles';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {LOGO_IMAGE_PLACEHOLDER_ID} from 'src/constants/placeholders';
import {getCloudinaryUrl} from 'src/helpers/getCloudinaryUrl';

export const NonprofitCard = () => {
	const {name, logoCloudinaryId, hasAdmin} = useNonprofitOrError();
	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	return (
		<GridCard className={cardCss}>
			<div className={avatarAndNameWrapperCss}>
				<div alt="nonprofit logo" className={logoImageCss(logoUrl)} />
				<h1 className={nonprofitNameCss}>
					{hasAdmin ? (
						<Fragment>
							<span>{name}</span> is using Every.org to accept this donation
						</Fragment>
					) : (
						<Fragment>
							Every.org created this page for <span>{name}</span>
						</Fragment>
					)}
				</h1>
			</div>
			<p className={descriptionCss}>
				Every.org is a 501(c)(3) nonprofit inspiring generosity and philanthropy
				for everyone.
			</p>
		</GridCard>
	);
};
