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

const cardCss = (clickable: boolean) =>
	cxs({
		padding: Spacing.S,
		border: getColoredBorder(Borders.Normal, COLORS.LightGray),
		borderRadius: Radii.Default,
		cursor: clickable ? 'pointer' : 'default'
	});

const countrySelectorCss = cxs({
	display: 'flex',
	flexDirection: 'row',
	margin: Spacing.Stack_S,
	alignItems: 'center',
	position: 'relative',
	cursor: 'pointer',
	justifyContent: 'space-between'
});

const countryTitleCss = cxs({
	display: 'flex',
	alignItems: 'center'
});

const arrowCss = (primaryColor: string) =>
	cxs({
		...labelText,
		color: primaryColor,
		lineHeight: 0
	});

const bodyCss = cxs({
	...bodyText,
	color: COLORS.TextOpaque,
	margin: 0
});

export const CountryCard = () => {
	const {country, currency, setRoute} = useWidgetContext();
	const {primaryColor, countries} = useConfigContext();
	const i18n = useI18n();

	const redirectNoticeText = useMemo(
		() =>
			replaceKeys(
				{
					nameAndRegistration: country?.nameAndRegistration,
					currency: currency?.name
				},
				i18n.donationRedirectNotice
			),
		[country, currency, i18n]
	);

	return (
		<div
			className={cardCss(countries?.length > 1)}
			onClick={() => {
				if (countries?.length > 1) {
					setRoute(Routes.SelectCountry);
				}
			}}
		>
			<div className={countrySelectorCss}>
				<div className={countryTitleCss}>
					<CountryTitle country={country} />
				</div>
				{countries?.length > 1 ? (
					<span className={arrowCss(primaryColor)}>
						<ChevronDown color={primaryColor} />
					</span>
				) : null}
			</div>
			<div>
				<p className={bodyCss}>{redirectNoticeText}</p>
			</div>
		</div>
	);
};
