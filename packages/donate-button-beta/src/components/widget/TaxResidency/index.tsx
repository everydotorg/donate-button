import cxs from 'cxs';
import {CountryTitle} from 'src/components/widget/CountryTitle';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText} from 'src/components/widget/theme/font-sizes';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

const countryCss = cxs({
	...bodyText,
	color: COLORS.Text,
	fontFamily: 'inherit',
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	justifyContent: 'space-between'
});

const taxCss = cxs({
	display: 'flex',
	alignItems: 'center',
	'& > :not(:last-child)': {
		marginRight: Spacing.XS
	}
});

const changeBtnCss = (color: string) =>
	cxs({
		...bodyText,
		color,
		cursor: 'pointer',
		padding: 0,
		margin: 0,
		border: 'none',
		backgroundColor: 'transparent',
		fontFamily: 'inherit'
	});

export const TaxResidency = () => {
	const {country, setRoute} = useWidgetContext();
	const {primaryColor, countries} = useConfigContext();
	const {tax, change} = useI18n();

	return (
		<div className={countryCss}>
			<div className={taxCss}>
				<span>{tax}</span>
				<CountryTitle country={country} />
			</div>
			<button
				type="button"
				className={changeBtnCss(primaryColor)}
				onClick={() => {
					if (countries?.length > 1) {
						setRoute(Routes.SelectCountry);
					}
				}}
			>
				{change}
			</button>
		</div>
	);
};
