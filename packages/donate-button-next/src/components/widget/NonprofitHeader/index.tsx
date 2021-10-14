import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = (backgroundUrl: string) =>
	cxs({
		height: '190px',
		backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundUrl})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative',
		[BREAKPOINTS.TabletLandscapeUp]: {
			borderTopLeftRadius: Radii.Medium
		}
	});

const logoContainerCss = cxs({
	borderRadius: Radii.Circle,
	border: '4px solid rgba(255,255,255,0.2)',
	width: '64px',
	height: '64px',
	position: 'absolute',
	top: Spacing.XL,
	left: Spacing.XL,
	overflow: 'hidden'
});

const logoImageCss = (logoUrl: string) =>
	cxs({
		width: '100%',
		height: '100%',
		display: 'block',
		backgroundImage: `url(${logoUrl})`,
		backgroundSize: 'contain'
	});

type NonprofitHeader = {
	classes: string[];
};

export const NonprofitHeader = ({classes}: NonprofitHeader) => {
	const {logo, backgroundImage} = useConfigContext();

	return (
		<div className={[containerCss(backgroundImage)].concat(classes).join(' ')}>
			<div className={logoContainerCss}>
				{logo && <div alt="nonprofit logo" className={logoImageCss(logo)} />}
			</div>
		</div>
	);
};
