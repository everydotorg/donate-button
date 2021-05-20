import cxs from 'cxs';
import chevronDown from 'src/assets/chevron-down.svg';
import {CountryTitle} from 'src/components/widget/CountryTitle';
import {useWidgetContext} from 'src/components/widget/hooks/use-widget-context';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText, labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Routes} from 'src/components/widget/types/routes';

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

const countrySelectedCss = cxs({
	...labelText,
	color: COLORS.Primary,
	margin: 0,
	transform: 'translateY(0.07em)'
});

const arrowCss = cxs({
	...labelText,
	color: COLORS.Primary,
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
	const {country, setRoute} = useWidgetContext();

	return (
		<div className={cardCss}>
			<div className={countrySelectorCss}>
				<CountryTitle country={country} />
				<span
					className={arrowCss}
					onClick={() => {
						setRoute(Routes.SelectCountry);
					}}
				>
					<img src={chevronDown} />
				</span>
			</div>
			<div>
				<p className={bodyCss}>
					You will be redirected to Every.org to complete your GBP donation to a
					UK registered charity eligible for GiftAid.
				</p>
			</div>
		</div>
	);
};
