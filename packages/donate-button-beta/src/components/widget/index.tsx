import cxs from 'cxs';
import {useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {CountryCard} from 'src/components/widget/CountryCard';
import {CountrySelector} from 'src/components/widget/CountrySelector';
import {FormControl} from 'src/components/widget/FormControl';
import {Frequency} from 'src/components/widget/Frequency';
import Info from 'src/components/widget/Info';
import {Input} from 'src/components/widget/Input';
import {NonprofitHeader} from 'src/components/widget/NonprofitHeader';
import {NonprofitInfo} from 'src/components/widget/NonprofitInfo';
import {SubmitButton} from 'src/components/widget/SubmitButton';
import {Country} from 'src/components/widget/constants/supported-countries';
import {supportedCurrencies} from 'src/components/widget/constants/supported-currencies';
import {ConfigContext} from 'src/components/widget/context/config-context';
import {WidgetContext} from 'src/components/widget/context/widget-context';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Currency} from 'src/components/widget/types/currency';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {Routes} from 'src/components/widget/types/routes';
import {WidgetConfig} from 'src/components/widget/types/widget-config';
import {mergeConfig} from 'src/helpers/options-types';

cxs.prefix('edoWidget-');

const wrapperCss = cxs({
	position: 'absolute',
	height: '100vh',
	width: '100vw',
	zIndex: 999,
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	display: 'flex',
	background: 'rgba(0, 0, 0, 0.5)',
	justifyContent: 'center',
	alignItems: 'center',
	fontFamily: FontFamily.BasisGrotesque
});

const widgetCss = cxs({
	background: 'white',
	overflow: 'hidden',

	display: 'grid',
	gridTemplateRows: 'max-content 1fr max-content',
	width: '100vw',
	height: '100vh',
	borderRadius: 'unset',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		// Temporary until we have more content inside the widget
		gridTemplateColumns: '60% 40%',
		gridTemplateRows: '1fr max-content max-content',
		height: '80vh',
		width: '70vw',
		borderRadius: '24px'
	}
});

const formCss = cxs({
	gridColumn: '1 / 2',
	gridRow: '1 / 3',
	padding: Spacing.Inset_XL,
	borderRight: 'none',

	display: 'grid',
	gridTemplateColumns: '1fr',
	gridAutoRows: 'max-content',
	rowGap: Spacing.XXL,
	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		borderRight: `1px solid ${COLORS.LightGray}`
	}
});

const nonProfitHeaderCss = cxs({
	height: '190px',
	gridColumn: '1 / -1',
	gridRow: '1 / 2',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		height: 'auto',
		gridColumn: '2 / 3',
		gridRow: '1 / 2'
	}
});

const nonProfitInfoCss = cxs({
	gridColumn: '2 / 3',
	gridRow: '2 / 4'
});

const ctaCss = cxs({
	gridColumn: '1 / -1',
	gridRow: '3 / 4',
	padding: `${Spacing.Empty} ${Spacing.XS} ${Spacing.XS} ${Spacing.XS}`,
	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		gridColumn: '1 / 2',
		gridRow: '3 / 4',
		borderRight: `1px solid ${COLORS.LightGray}`,
		padding: '1.5rem'
	}
});

const scrollableContent = cxs({
	display: 'flex',
	flexDirection: 'column',
	overflow: 'auto',
	gridColumn: '1 / -1',
	gridRow: '2 / 3',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		display: 'contents',
		overflow: 'initial'
	}
});

const getSubmitButtonText = (
	donationAmount: number,
	currency: Currency,
	frequency: DonationFrequency
) => {
	if (frequency === '') {
		return 'Select frequency';
	}

	if (Number.isNaN(donationAmount)) {
		return 'Enter an amount to donate';
	}

	const currencySymbol = supportedCurrencies[currency];

	let text = `Donate ${currencySymbol}${donationAmount}`;

	if (frequency === DonationFrequency.Monthly) {
		text = text.concat(' Monthly');
	}

	return text;
};

interface WidgetProps {
	options: Partial<WidgetConfig>;
}

const Widget = ({options}: WidgetProps) => {
	const config = mergeConfig(options);

	const [route, setRoute] = useState<string>(Routes.DonationForm);
	const [showFrequencyPopover, setShowFrequencyPopover] = useState<boolean>(
		true
	);
	const [donationAmount, setDonationAmount] = useState<number>(100);
	const [currency, setCurrency] = useState<Currency>('GBP');
	const [frequency, setFrequency] = useState<DonationFrequency>(
		DonationFrequency.Unselected
	);
	const [country, setCountry] = useState<Country>('GB');

	return config.show ? (
		<ConfigContext.Provider value={config}>
			<WidgetContext.Provider
				value={{
					showFrequencyPopover,
					dismissPopover: () => {
						setShowFrequencyPopover(false);
					},
					setRoute,
					route,
					frequency,
					country,
					setCountry,
					currency,
					setCurrency,
					donationAmount
				}}
			>
				<div className={wrapperCss}>
					<form className={widgetCss}>
						{route === Routes.DonationForm ? (
							<Fragment>
								<div className={scrollableContent}>
									<div className={formCss}>
										<FormControl label="Frequency">
											<Frequency
												frequency={frequency}
												setFrequency={setFrequency}
											/>
										</FormControl>
										<FormControl label="Amount">
											<Input
												selectedCurrency={currency}
												setCurrency={setCurrency}
												value={donationAmount}
												setValue={setDonationAmount}
											/>
										</FormControl>
										<FormControl label="Country for tax deduction">
											<CountryCard />
										</FormControl>
									</div>
									<NonprofitInfo classes={[nonProfitInfoCss]} />
								</div>
								<div className={ctaCss}>
									<SubmitButton
										disabled={
											frequency === DonationFrequency.Unselected ||
											Number.isNaN(donationAmount)
										}
									>
										{getSubmitButtonText(donationAmount, currency, frequency)}
									</SubmitButton>
								</div>
								<NonprofitHeader classes={[nonProfitHeaderCss]} />
							</Fragment>
						) : route === Routes.SelectCountry ? (
							<CountrySelector />
						) : (
							<Info />
						)}
					</form>
				</div>
			</WidgetContext.Provider>
		</ConfigContext.Provider>
	) : null;
};

export default Widget;
