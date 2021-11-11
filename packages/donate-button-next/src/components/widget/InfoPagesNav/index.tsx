import cxs from 'cxs';
import {Divider} from 'src/components/widget/Divider';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {Spacing} from 'src/components/widget/theme/spacing';

type InfoPagesNavProps = {
	classes: string[];
};

const dividerCss = cxs({
	display: 'none',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'block'
	}
});

const containerCss = cxs({
	padding: 0,
	margin: 0,
	[BREAKPOINTS.TabletLandscapeUp]: {
		padding: `0 ${Spacing.XL}`,
		paddingBottom: Spacing.XL
	}
});

const navItemsContainerCss = (primaryColor: string) =>
	cxs({
		display: 'flex',
		alignItems: 'center',
		marginTop: Spacing.XL,
		'& > span': {
			color: primaryColor,
			cursor: 'pointer'
		},
		'& > :not(:last-child)': {
			margin: Spacing.Inline_XL
		},
		a: {
			color: primaryColor,
			cursor: 'pointer',
			textDecoration: 'none'
		}
	});

export const InfoPagesNav = ({classes}: InfoPagesNavProps) => {
	const {
		infoPages,
		primaryColor,
		showFundraiser,
		nonprofitSlug
	} = useConfigContext();
	const {setRoute} = useWidgetContext();

	if (infoPages?.length === 0 && !showFundraiser) {
		return null;
	}

	return (
		<div className={[...classes, containerCss].join(' ')}>
			<Divider classes={[dividerCss]} />

			<div className={navItemsContainerCss(primaryColor)}>
				{infoPages?.map((page) => (
					<span
						key={page.key}
						onClick={() => {
							setRoute(page.key);
						}}
					>
						{page.name}
					</span>
				))}
				{showFundraiser && (
					<span key="fundraiser">
						<a href={`https://www.every.org/${nonprofitSlug}/fundraiser`}>
							Fundraise
						</a>
					</span>
				)}
			</div>
		</div>
	);
};
