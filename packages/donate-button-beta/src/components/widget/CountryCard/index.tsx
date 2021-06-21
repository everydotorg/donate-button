import cxs from 'cxs';
import {useMemo} from 'preact/hooks';
import {CountryTitle} from 'src/components/widget/CountryTitle';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {ChevronDown} from 'src/components/widget/svg/ChevronDown';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText, labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';
import {replaceKeys} from 'src/helpers/interpolation';

const cardCss = cxs({
	padding: Spacing.S,
	border: getColoredBorder(Borders.Normal, COLORS.LightGray),
	borderRadius: Radii.Default
});

const countrySelectorCss = cxs({
	display: 'flex',
	flexDirection: 'row',
	margin: Spacing.Stack_M,
	alignItems: 'center',
	position: 'relative',
	cursor: 'pointer'
});

const arrowCss = (primaryColor: string) =>
	cxs({
		...labelText,
		color: primaryColor,
		position: 'absolute',
		top: '50%',
		right: 0,
		transform: 'translateY(-50%)'
	});

const bodyCss = cxs({
	...bodyText,
	color: COLORS.TextOpaque,
	margin: 0
});

export const CountryCard = () => {
	const {country, currency, setRoute} = useWidgetContext();
	const {primaryColor} = useConfigContext();
	const i18n = useI18n();

	const redirectNoticeText = useMemo(
		() =>
			replaceKeys(
				{
					country: country?.countryCode,
					currency: currency?.name
				},
				i18n.donationRedirectNotice
			),
		[country, currency, i18n]
	);

	return (
		<div className={cardCss}>
			<div className={countrySelectorCss}>
				<CountryTitle country={country} />
				<span
					className={arrowCss(primaryColor)}
					onClick={() => {
						setRoute(Routes.SelectCountry);
					}}
				>
					<ChevronDown color={primaryColor} />
				</span>
			</div>
			<div>
				<p className={bodyCss}>{redirectNoticeText}</p>
			</div>
		</div>
	);
};
