import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {LeftArrow} from 'src/components/widget/svg/LeftArrow';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {
	headingText,
	heading2Text,
	heading3Text,
	labelText,
	linkText
} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

const containerCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	gridColumn: '1 / -1',
	gridRow: '1 / -1'
});

const headerCss = cxs({
	display: 'flex',
	padding: Spacing.Inset_XL,
	borderBottom: getColoredBorder(Borders.Normal, COLORS.LightGray),
	alignItems: 'center',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		border: 'none'
	}
});

const returnButtonCss = cxs({
	padding: Spacing.Empty,
	margin: Spacing.Inline_XXL,
	backgroundColor: COLORS.Transparent,
	border: 'none',
	outline: 'none',
	cursor: 'pointer'
});

const contentCss = (primaryColor: string) =>
	cxs({
		overflow: 'auto',
		height: '100%',
		padding: `${Spacing.Empty} ${Spacing.XL}`,
		'& > h1': {
			...headingText,
			fontWeight: 'bold'
		},
		'& > h2': {
			...heading2Text,
			fontWeight: 'bold'
		},
		'& > h3': {
			...heading3Text,
			fontWeight: 'bold'
		},
		'& > p': {
			...labelText
		},
		'& a': {
			...linkText,
			color: primaryColor,
			':visited': {
				color: primaryColor
			}
		}
	});

interface SectionContainerProps {
	renderHeader: ComponentChildren;
	renderBody: ComponentChildren;
}
export const SectionContainer = ({
	renderBody,
	renderHeader
}: SectionContainerProps) => {
	const {primaryColor} = useConfigContext();
	const {setRoute} = useWidgetContext();

	return (
		<div className={containerCss}>
			<div className={headerCss}>
				<button
					type="button"
					className={returnButtonCss}
					onClick={() => {
						setRoute(Routes.DonationForm);
					}}
				>
					<LeftArrow color={primaryColor} />
				</button>
				{renderHeader}
			</div>
			<div className={contentCss(primaryColor)}>{renderBody}</div>
		</div>
	);
};
