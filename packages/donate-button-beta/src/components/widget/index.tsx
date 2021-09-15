import cxs from 'cxs';
import {useEffect, useRef, useState} from 'preact/hooks';
import {Fragment} from 'preact/jsx-runtime';
import {JSXInternal} from 'preact/src/jsx';
import {CloseButton} from 'src/components/widget/CloseButton';
import {CountryCard} from 'src/components/widget/CountryCard';
import {CountrySelector} from 'src/components/widget/CountrySelector';
import {Crypto} from 'src/components/widget/Crypto';
import {FormControl} from 'src/components/widget/FormControl';
import {Frequency} from 'src/components/widget/Frequency';
import {Info} from 'src/components/widget/Info';
import {Input} from 'src/components/widget/Input';
import {NonprofitHeader} from 'src/components/widget/NonprofitHeader';
import {NonprofitInfo} from 'src/components/widget/NonprofitInfo';
import {RedirectNotice} from 'src/components/widget/RedirectNotice';
import {SubmitButton} from 'src/components/widget/SubmitButton';
import {getNonprofitInfo} from 'src/components/widget/api/get-nonprofit-info';
import {ConfigContext} from 'src/components/widget/context/config-context';
import {WidgetContext} from 'src/components/widget/context/widget-context';
import {getTranslations} from 'src/components/widget/hooks/use-i18n';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {COLORS} from 'src/components/widget/theme/colors';
import {FontFamily} from 'src/components/widget/theme/font-family';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';
import {CurrencyOption} from 'src/components/widget/types/currency-option';
import {DonationFrequency} from 'src/components/widget/types/donation-frequency';
import {DonationRecipient} from 'src/components/widget/types/donation-recipient';
import {Language} from 'src/components/widget/types/language';
import {PaymentMethod} from 'src/components/widget/types/payment-method';
import {Routes} from 'src/components/widget/types/routes';
import {WidgetConfig} from 'src/components/widget/types/widget-config';
import constructEveryUrl from 'src/helpers/construct-every-url';
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
		height: '550.4px',
		width: '716.96px',

		borderRadius: Radii.Medium,
		gridTemplateColumns: '55.5% 44.5%',
		gridTemplateRows: '1fr 1fr max-content max-content'
	}
});

const formCss = cxs({
	gridColumn: '1 / 2',
	gridRow: '1 / 3',
	padding: Spacing.Inset_XL,
	borderRight: 'none',
	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'max-content max-content 1fr',
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

const cryptoContainerCss = cxs({
	gridRow: '4 / 5',
	gridColumn: '1 / -1',

	[`${BREAKPOINTS.TabletLandscapeUp}`]: {
		gridRow: '4 / 5',
		gridColumn: '2 / 3'
	}
});

const donateButtonContainer = cxs({
	gridColumn: '1 / -1',
	gridRow: '3 / 4',
	padding: `${Spacing.XS} ${Spacing.XS}`,
	[BREAKPOINTS.TabletLandscapeUp]: {
		gridColumn: '1 / 2',
		gridRow: '3 / -1',
		borderRight: `1px solid ${COLORS.LightGray}`,
		padding: `${Spacing.Empty} ${Spacing.XL} ${Spacing.XL} ${Spacing.XL}`
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
	donationAmount: number | undefined,
	currency: CurrencyOption,
	frequency: DonationFrequency,
	i18n: Language
) => {
	if (frequency === '') {
		return i18n.frequencySelect;
	}

	if (!donationAmount) {
		return i18n.chooseAnAmount;
	}

	if (Number.isNaN(donationAmount)) {
		return i18n.amountError;
	}

	let text = `${i18n.donate} ${currency.symbol}${donationAmount}`;
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
	const mergedConfig = mergeConfig(options);

	const [config, setConfig] = useState(mergedConfig);
	const [route, setRoute] = useState<string>(Routes.DonationForm);
	const [showFrequencyPopover, setShowFrequencyPopover] = useState<boolean>(
		config.showInitialMessage
	);
	const [donationAmount, setDonationAmount] = useState<number | undefined>(
		config.defaultDonationAmount
	);
	const [currency, setCurrency] = useState<CurrencyOption>(
		mergedConfig.currencies[0]
	);
	const [frequency, setFrequency] = useState<DonationFrequency>(
		config.defaultFrequency
	);
	const [showScrolledHeader, setShowScrolledHeader] = useState(false);
	const [country, setCountry] = useState<DonationRecipient>(null as any);
	const [submitError, setSubmitError] = useState<string | null>(null);

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
		setSubmitError(null);
	}, [country, currency]);

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

	useEffect(() => {
		const fetchInfo = async () => {
			const info = await getNonprofitInfo(
				options.nonprofitSlug ?? 'everydotorg'
			);
			setConfig(
				mergeConfig({
					...info,
					...options
				})
			);
			setCountry(
				options.countries?.[0] ??
					info.countries?.[0] ?? {
						id: options.nonprofitSlug,
						name: 'United States',
						nameAndRegistration: info.name,
						countryCode: 'US',
						paymentMethods: [
							PaymentMethod.Card,
							PaymentMethod.ApplePay,
							PaymentMethod.GooglePay,
							PaymentMethod.Bank
						]
					}
			);
		};

		void fetchInfo();
	}, [options]);

	const submitDonation = (
		event: JSXInternal.TargetedEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		if (!donationAmount) {
			setSubmitError(i18n.chooseAnAmount);
			return;
		}

		if (donationAmount < currency.minimumAmount) {
			setSubmitError(
				`${i18n.minDonationAmount} ${currency.name} ${currency.minimumAmount}`
			);
			return;
		}

		const url = constructEveryUrl({
			nonprofitSlug: country.id,
			frequency,
			amount: donationAmount,
			crypto: false,
			noExit: mergedConfig.noExit
		});

		const target = '_self';

		window.open(url, target);
	};

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
					<form className={widgetCss} onSubmit={submitDonation}>
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
												error={submitError}
												setError={setSubmitError}
												setCountry={setCountry}
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

									<Crypto classes={[cryptoContainerCss]} />
								</div>

								<div className={donateButtonContainer}>
									<SubmitButton
										disabled={
											frequency === DonationFrequency.Unselected ||
											!donationAmount ||
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
