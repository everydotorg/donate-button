import cxs from 'cxs';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {Close} from 'src/components/widget/svg/Close';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	display: 'flex',
	flexDirection: 'column',
	padding: Spacing.Inset_M
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
	display: 'flex',
	alignItems: 'center',
	background: COLORS.Gray,
	padding: Spacing.XXS,
	border: 'none',
	outline: 'none',
	cursor: 'pointer',
	borderRadius: Radii.Default
});

interface FrequencyPopoverContentProps {
	onClose: () => void;
}

export const FrequencyPopoverContent = ({
	onClose
}: FrequencyPopoverContentProps) => {
	const i18n = useI18n();

	return (
		<div className={containerCss}>
			<div className={headerCss}>
				<p className={titleCss}>{i18n.frequencyPopover}</p>
				<button className={closeButtonCss} type="button" onClick={onClose}>
					<Close color={COLORS.Text} size={20} />
				</button>
			</div>
		</div>
	);
};
