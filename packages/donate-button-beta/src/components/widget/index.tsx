import cxs from 'cxs';
import {useEffect, useLayoutEffect, useRef, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import {CloseButton} from 'src/components/widget/CloseButton';
import {CountryCard} from 'src/components/widget/CountryCard';
import {CountrySelector} from 'src/components/widget/CountrySelector';
import {FormControl} from 'src/components/widget/FormControl';
import {Frequency} from 'src/components/widget/Frequency';
import {Info} from 'src/components/widget/Info';
import {Input} from 'src/components/widget/Input';
import {NonprofitHeader} from 'src/components/widget/NonprofitHeader';
import {NonprofitInfo} from 'src/components/widget/NonprofitInfo';
import {RedirectNotice} from 'src/components/widget/RedirectNotice';
import {SubmitButton} from 'src/components/widget/SubmitButton';
import {Country} from 'src/components/widget/constants/supported-countries';
import {supportedCurrencies} from 'src/components/widget/constants/supported-currencies';
import {ConfigContext} from 'src/components/widget/context/config-context';
import {WidgetContext} from 'src/components/widget/context/widget-context';
import {getTranslations} from 'src/components/widget/hooks/use-i18n';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {Currency} from 'src/components/widget/types/currency';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {Language} from 'src/components/widget/types/language';
import {Routes} from 'src/components/widget/types/routes';
import {WidgetConfig} from 'src/components/widget/types/widget-config';
import {mergeConfig} from 'src/helpers/options-types';
cxs.prefix('edoWidget-');
const wrapperCss = cxs({
	position: 'absolute',
	height: 'auto',
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
	display: 'grid',
	gridTemplateRows: '1fr max-content',
	width: '100vw',
	height: '100%',
	borderRadius: 'unset',
	position: 'relative',
	[BREAKPOINTS.TabletLandscapeUp]: {
		// Fix te size of the widget to match the desings.
		// We can add a new breakpoints for large devices is this is too small
		height: '32.31rem',
		width: '44.81rem',

		borderRadius: Radii.Medium,
		gridTemplateColumns: '60% 40%',
		gridTemplateRows: '1fr max-content max-content'
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
	[BREAKPOINTS.TabletLandscapeUp]: {
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
	gridRow: '1 / 2',
	[BREAKPOINTS.TabletLandscapeUp]: {
		display: 'contents',
		overflow: 'initial'
	}
});

const closeBoxCss = cxs({
	position: 'absolute',
	zIndex: 1,
	top: Spacing.XS,
	right: Spacing.Empty,
	[BREAKPOINTS.TabletLandscapeUp]: {
		top: `-${Spacing.M}`,
		right: `-${Spacing.XXL}`
	}
});

const getSubmitButtonText = (
	donationAmount: number,
	currency: Currency,
	frequency: DonationFrequency,
	i18n: Language
) => {
	if (frequency === '') {
		return i18n.frequencySelect;
	}

	if (Number.isNaN(donationAmount)) {
		return i18n.amountError;
	}

	const currencySymbol = supportedCurrencies[currency];
	let text = `${i18n.donate} ${currencySymbol}${donationAmount}`;
	if (frequency === DonationFrequency.Monthly) {
		text = text.concat(` ${i18n.monthly}`);
	}

	return text;
};

interface WidgetProps {
	options: Partial<WidgetConfig>;
	hide: () => void;
}

const Widget = ({options, hide}: WidgetProps) => {
	const config = mergeConfig(options);
	const [route, setRoute] = useState<string>(Routes.DonationForm);
	const [showFrequencyPopover, setShowFrequencyPopover] = useState<boolean>(
		config.showInitialMessage
	);
	const [donationAmount, setDonationAmount] = useState<number>(
		config.defaultDonationAmounts.monthly
	);
	const [currency, setCurrency] = useState<Currency>('GBP');
	const [frequency, setFrequency] = useState<DonationFrequency>(
		config.defaultFrequency
	);
	const [showScrolledHeader, setShowScrolledHeader] = useState(false);
	const [country, setCountry] = useState<Country>('GB');

	const hideOnWrapperClick: JSXInternal.MouseEventHandler<Element> = (
		event
	) => {
		if (event.target === event.currentTarget) {
			hide();
		}
	};

	const i18n = getTranslations(config.i18n, config.forceLanguage);
	const scrollableContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollableContainerRef.current) {
			const scrollableRef = scrollableContainerRef.current;
			const modifyHeaderHeight = () => {
				const {scrollTop} = scrollableRef;
				if (
					!window.matchMedia(BREAKPOINTS.TabletLandscapeUp).matches &&
					!showScrolledHeader
				) {
					setShowScrolledHeader(scrollTop > 90);
				}
			};

			scrollableRef.addEventListener('scroll', modifyHeaderHeight);

			return () => {
				scrollableRef.removeEventListener('scroll', modifyHeaderHeight);
			};
		}
	}, [showScrolledHeader]);

	// UseEffect(() => {
	// 	const fetchInfo = async () => {
	// 		const info = await getNonprofitInfo('owid');
	// 		console.log(info);
	// 	};

	// 	void fetchInfo();
	// }, []);

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
					donationAmount,
					setDonationAmount,
					hideWidget: hide
				}}
			>
				<div className={wrapperCss} onClick={hideOnWrapperClick}>
					<form className={widgetCss}>
						{!showScrolledHeader && (
							<CloseButton positionCss={closeBoxCss} color={COLORS.White} />
						)}
						{route === Routes.DonationForm ? (
							<Fragment>
								<div ref={scrollableContainerRef} className={scrollableContent}>
									<NonprofitHeader
										showScrolled={showScrolledHeader}
										classes={[nonProfitHeaderCss]}
									/>
									<div className={formCss}>
										<FormControl label={i18n.frequency}>
											<Frequency
												frequency={frequency}
												setFrequency={setFrequency}
											/>
										</FormControl>
										<FormControl label={i18n.amount}>
											<Input
												selectedCurrency={currency}
												setCurrency={setCurrency}
												value={donationAmount}
												setValue={setDonationAmount}
											/>
										</FormControl>
										{config.countrySelection ? (
											<FormControl label={i18n.countryTitle}>
												<CountryCard />
											</FormControl>
										) : (
											<RedirectNotice />
										)}
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
										{getSubmitButtonText(
											donationAmount,
											currency,
											frequency,
											i18n
										)}
									</SubmitButton>
								</div>
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
