import cxs from 'cxs';
import chevronDown from 'src/assets/chevron-down.svg';
import gbFlag from 'src/assets/flags/gb.svg';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {bodyText, labelText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

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

const countryFlagCss = cxs({
	height: '1rem',
	width: '1rem',
	borderRadius: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
	margin: Spacing.Inline_M
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
	return (
		<div className={cardCss}>
			<div className={countrySelectorCss}>
				<img className={countryFlagCss} src={gbFlag} alt="country flag" />
				<p className={countrySelectedCss}>Great Bretain</p>
				<span className={arrowCss}>
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
