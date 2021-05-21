import cxs from 'cxs';
import closeSvg from 'src/assets/close.svg';
import useI18n from 'src/components/widget/hooks/use-i18n';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import constructEveryUrl from 'src/helpers/construct-every-url';

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

const dividerCss = cxs({
	height: '1px',
	background: COLORS.LightGray,
	margin: `${Spacing.M} -${Spacing.M} ${Spacing.M} -${Spacing.M}`
});

const actionLink = cxs({
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderRadius: Radii.Default,
	color: COLORS.Primary,
	padding: Spacing.InsetSquish_XS,
	background: 'transparent',
	cursor: 'pointer',
	textDecoration: 'none',
	textAlign: 'center'
});

interface FrequencyPopoverContentProps {
	onClose: () => void;
	nonprofitSlug: string;
}

export const FrequencyPopoverContent = ({
	onClose,
	nonprofitSlug
}: FrequencyPopoverContentProps) => {
	const donateWithCryptoUrl = constructEveryUrl({nonprofitSlug, crypto: true});

	const i18n = useI18n();

	return (
		<div className={containerCss}>
			<div className={headerCss}>
				<p className={titleCss}>{i18n.frequencyPopover}</p>
				<button className={closeButtonCss} type="button" onClick={onClose}>
					<img src={closeSvg} />
				</button>
			</div>
			<div className={dividerCss} />
			<a type="button" className={actionLink} href={donateWithCryptoUrl}>
				{i18n.donateWithCrypto}
			</a>
		</div>
	);
};
