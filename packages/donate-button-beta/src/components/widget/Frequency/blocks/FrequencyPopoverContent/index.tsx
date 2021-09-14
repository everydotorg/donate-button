import cxs from 'cxs';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {Close} from 'src/components/widget/svg/Close';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	padding: Spacing.Inset_M,
	zIndex: 1
});

const headerCss = cxs({
	display: 'flex',
	alignItems: 'flex-start'
});

const titleCss = cxs({
	flex: 1,
	margin: Spacing.Inline_M
});

const closeButtonCss = cxs({
	background: 'transparent',
	padding: Spacing.Empty,
	margin: Spacing.Empty,
	border: 'none',
	outline: 'none',
	cursor: 'pointer'
});

const actionLink = (primaryColor: string) =>
	cxs({
		border: getColoredBorder(Borders.Normal, COLORS.LightGray),
		borderRadius: Radii.Default,
		color: primaryColor,
		padding: Spacing.InsetSquish_XS,
		background: 'transparent',
		cursor: 'pointer',
		textDecoration: 'none',
		textAlign: 'center'
	});

interface FrequencyPopoverContentProps {
	onClose: () => void;
}

export const FrequencyPopoverContent = ({
	onClose
}: FrequencyPopoverContentProps) => {
	const {primaryColor} = useConfigContext();

	const i18n = useI18n();

	return (
		<div className={containerCss}>
			<div className={headerCss}>
				<p className={titleCss}>{i18n.frequencyPopover}</p>
				<button className={closeButtonCss} type="button" onClick={onClose}>
					<Close color={primaryColor} />
				</button>
			</div>
		</div>
	);
};
