import cxs from 'cxs';
import {Fragment} from 'preact/jsx-runtime';
import {GridCard} from 'src/components/widget/components/GridCard';
import {
	nonprofitNameCss,
	descriptionCss,
	truncatedTextCss,
	fundraiserCardLogoCss,
	fundraiserAvatarAndNameWrapperCss,
	largeFundraiserCardCss,
	smallFundraiserCardCss
} from 'src/components/widget/components/NonprofitInfo/styles';
import {useNonprofitOrError} from 'src/components/widget/hooks/useNonprofit';
import {Fundraiser} from 'src/components/widget/types/Fundraiser';
import {LOGO_IMAGE_PLACEHOLDER_ID} from 'src/constants/placeholders';
import {getCloudinaryUrl} from 'src/helpers/getCloudinaryUrl';
import joinClassNames from 'src/helpers/joinClassNames';

const coverImageCss = (url: string) =>
	cxs({
		backgroundImage: `url(${url})`,
		backgroundSize: 'cover',
		width: 'calc(100% + 25px + 25px)',
		height: '160px',
		position: 'relative',
		left: '-25px'
	});

interface FundraiserCardProps {
	fundraiser: Fundraiser;
}

export const FundraiserCard = ({fundraiser}: FundraiserCardProps) => {
	return (
		<Fragment>
			<LargeFundraiserCard fundraiser={fundraiser} />
			<SmallFundraiserCard fundraiser={fundraiser} />
		</Fragment>
	);
};

const LargeFundraiserCard = ({fundraiser}: FundraiserCardProps) => {
	const {
		name: nonprofitName,
		logoCloudinaryId,
		coverImageCloudinaryId,
		hasAdmin
	} = useNonprofitOrError();
	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	const coverImageUrl =
		coverImageCloudinaryId &&
		getCloudinaryUrl(coverImageCloudinaryId, {width: 320});

	return (
		<GridCard className={largeFundraiserCardCss}>
			<div className={fundraiserAvatarAndNameWrapperCss}>
				<div alt="nonprofit logo" className={fundraiserCardLogoCss(logoUrl)} />
				<div className="every-embedded-fundraiser-card__nonprofit-name">
					<h2 className={truncatedTextCss(1)}>{nonprofitName}</h2>
					{fundraiser.creatorNonprofitId === fundraiser.nonprofitId && (
						<p className={descriptionCss}>Official fundraiser</p>
					)}
				</div>
			</div>
			{coverImageUrl && <div className={coverImageCss(coverImageUrl)} />}
			<h1 className={nonprofitNameCss}>
				<span>{fundraiser.title}</span>
			</h1>
			{fundraiser.description && (
				<p className={joinClassNames([descriptionCss, truncatedTextCss(3)])}>
					{fundraiser.description}
				</p>
			)}
		</GridCard>
	);
};

const SmallFundraiserCard = ({fundraiser}: FundraiserCardProps) => {
	const {
		name: nonprofitName,
		logoCloudinaryId,
		coverImageCloudinaryId,
		hasAdmin
	} = useNonprofitOrError();
	const logoUrl = getCloudinaryUrl(
		logoCloudinaryId ?? LOGO_IMAGE_PLACEHOLDER_ID
	);
	const coverImageUrl =
		coverImageCloudinaryId && getCloudinaryUrl(coverImageCloudinaryId);

	return (
		<GridCard className={smallFundraiserCardCss}>
			<div className={fundraiserAvatarAndNameWrapperCss}>
				<div alt="nonprofit logo" className={fundraiserCardLogoCss(logoUrl)} />
				<h1 className={nonprofitNameCss}>
					<span>{fundraiser.title}</span>
				</h1>
			</div>
		</GridCard>
	);
};
