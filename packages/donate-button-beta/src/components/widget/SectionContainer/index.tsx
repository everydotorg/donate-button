import cxs from 'cxs';
import {ComponentChildren} from 'preact';
import LeftArrow from 'src/assets/left-arrow.svg';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
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
	padding: Spacing.InsetSquish_M,
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

const contentCss = cxs({
	overflow: 'auto',
	height: '100%',
	padding: `${Spacing.Empty} ${Spacing.XL}`
});

interface SectionContainerProps {
	renderHeader: ComponentChildren;
	renderBody: ComponentChildren;
}
export const SectionContainer = ({
	renderBody,
	renderHeader
}: SectionContainerProps) => {
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
					<img src={LeftArrow} alt="Back button" />
				</button>
				{renderHeader}
			</div>
			<div className={contentCss}>{renderBody}</div>
		</div>
	);
};
