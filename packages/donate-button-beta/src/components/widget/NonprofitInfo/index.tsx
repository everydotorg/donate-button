import cxs from 'cxs';
import {Markdown} from 'src/components/widget/Markdown';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {
	bodyText,
	headingText,
	smallText
} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	...bodyText,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'initial',
	margin: Spacing.InsetSquish_S,
	' > *:not(:last-child)': {
		marginBottom: Spacing.XL
	},
	color: COLORS.Text,
	' > p': {
		margin: Spacing.Empty,
		padding: Spacing.Empty,
		letterSpacing: '-0.005em'
	},
	[BREAKPOINTS.TabletLandscapeUp]: {
		margin: Spacing.Inset_XL,
		marginBottom: Spacing.XXL,
		overflow: 'auto'
	}
});

// const lastParagraph = cxs({
// 	color: COLORS.TextOpaque,
// 	' > p': {
// 		display: 'block',
// 		margin: 0
// 	}
// });

const nonprofitNameCss = cxs({
	...headingText,
	margin: `0 0 ${Spacing.XXS} 0`
});

const locationAddressCss = cxs({
	...smallText,
	margin: 0,
	textTransform: 'uppercase',
	color: COLORS.TextOpaque
});

type NonprofitInfo = {
	classes: string[];
};

export const NonprofitInfo = ({classes}: NonprofitInfo) => {
	const {name, locationAddress, description} = useConfigContext();

	// @todo: check if we should keep this option, or remove
	// const {thanksDonation} = useI18n();

	return (
		<div className={[containerCss].concat(classes).join(' ')}>
			<div>
				<h1 className={nonprofitNameCss}>{name}</h1>
				<h2 className={locationAddressCss}>{locationAddress}&nbsp;</h2>
			</div>

			<Markdown source={description} />

			{/* <div className={lastParagraph}>
				<Markdown source={thanksDonation} />
			</div> */}
		</div>
	);
};
