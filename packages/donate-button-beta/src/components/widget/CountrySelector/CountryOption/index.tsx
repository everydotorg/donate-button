import cxs from 'cxs';
import {PaymentMethod} from 'src/components/widget/CountrySelector/PaymentMethod';
import {CountryTitle} from 'src/components/widget/CountryTitle';
import {useConfigContext} from 'src/components/widget/hooks/use-config-context';
import {useI18n} from 'src/components/widget/hooks/use-i18n';
import {Borders, getColoredBorder} from 'src/components/widget/theme/borders';
import {COLORS} from 'src/components/widget/theme/colors';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {replaceKeys} from 'src/helpers/interpolation';

const containerCss = (selected: boolean, color: string) =>
	cxs({
		display: 'flex',
		flexDirection: 'column',
		border: getColoredBorder(
			Borders.Normal,
			selected ? color : COLORS.LightGray
		),
		padding: Spacing.Inset_S,
		borderRadius: Radii.Default,
		cursor: 'pointer'
	});

const countryHeaderCss = (color: string) =>
	cxs({
		display: 'flex',
		alignItems: 'center',
		margin: Spacing.Stack_XS,
		color,
		' span': {
			transform: 'translateY(0.09em)'
		},
		'& > :not(:last-child)': {
			marginRight: Spacing.M
		}
	});

const descriptionCss = cxs({
	fontSize: '14px',
	lineHeight: '20px',
	letterSpacing: '-0.005em',
	marginBottom: Spacing.XS,
	color: COLORS.Text
});

const paymentMethodsCss = cxs({
	display: 'flex',
	flexWrap: 'wrap',
	'& > *:not(:last-child)': {
		marginRight: Spacing.XS
	}
});

const paymentMethodCss = cxs({
	marginTop: Spacing.XS
});

type CountryOptionProps = {
	selected: boolean;
	country: DonationRecipient;
	selectCountry: (country: DonationRecipient) => void;
};

export const CountryOption = ({
	country,
	selectCountry,
	selected
}: CountryOptionProps) => {
	const {name, primaryColor} = useConfigContext();
	const {nameAndRegistration} = country;
	const i18n = useI18n();

	return (
		<div
			className={containerCss(selected, primaryColor)}
			onClick={() => {
				selectCountry(country);
			}}
		>
			<div className={countryHeaderCss(primaryColor)}>
				<CountryTitle country={country} />
			</div>

			<p className={descriptionCss}>
				{replaceKeys(
					{projectName: name, nameAndRegistration},
					i18n.countryDescription
				)}
			</p>

			<div className={paymentMethodsCss}>
				{country?.paymentMethods.map((pm) => (
					<PaymentMethod
						key={pm}
						paymentMethod={pm}
						classes={[paymentMethodCss]}
					/>
				))}
			</div>
		</div>
	);
};
