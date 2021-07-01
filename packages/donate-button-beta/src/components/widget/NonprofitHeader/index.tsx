import cxs from 'cxs';
import preact from 'preact';
import {forwardRef} from 'preact/compat';
import {CloseButton} from 'src/components/widget/CloseButton';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {headingText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = (backgroundUrl: string) =>
	cxs({
		minHeight: '190px',
		backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundUrl})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		position: 'relative',
		borderTopRightRadius: 'none',
		[BREAKPOINTS.TabletLandscapeUp]: {
			borderTopRightRadius: Radii.Medium
		}
	});

const nonprofitNameCss = cxs({
	...headingText,
	position: 'absolute',
	bottom: Spacing.M,
	left: '0',
	padding: 0,
	margin: `${Spacing.Empty} ${Spacing.XL}`,
	fontWeight: 'bold',
	color: 'white'
});

const logoContainerCss = cxs({
	borderRadius: Radii.Circle,
	border: '4px solid rgba(255,255,255,0.2)',
	width: '4rem',
	height: '4rem',
	position: 'absolute',
	top: Spacing.XL,
	right: Spacing.XL,
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

const scrolledHeaderContainerCss = cxs({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: `${Spacing.M} ${Spacing.XL}`,
	background: 'white',
	position: 'sticky',
	top: 0,
	left: 0,
	zIndex: 10,
	'& > p': {
		margin: 0
	},
	borderBottom: `1px solid ${COLORS.LightGray}`,
	transition: 'all .4s'
});

const closeWidgetButton = cxs({
	paddingRight: Spacing.Empty
});

type NonprofitHeader = {
	classes: string[];
	showScrolled: boolean;
};

export const NonprofitHeader = forwardRef(
	(
		{classes, showScrolled}: NonprofitHeader,
		ref: preact.Ref<HTMLDivElement>
	) => {
		const {name, primaryColor, logo, backgroundImage} = useConfigContext();
		return showScrolled ? (
			<div className={[scrolledHeaderContainerCss].concat(classes).join(' ')}>
				<p>
					Donate to <strong>{name}</strong>
				</p>
				<CloseButton positionCss={closeWidgetButton} color={primaryColor} />
			</div>
		) : (
			<div
				ref={ref}
				className={[containerCss(backgroundImage)].concat(classes).join(' ')}
			>
				<p className={nonprofitNameCss}>{name}</p>
				<div className={logoContainerCss}>
					<div alt="nonprofit logo" className={logoImageCss(logo)} />
				</div>
			</div>
		);
	}
);
