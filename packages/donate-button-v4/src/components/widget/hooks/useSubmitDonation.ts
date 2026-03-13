import {useCallback} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useCustomizationOrUndefined} from 'src/components/widget/hooks/useCustmization';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	OneTimeFrequencyMethods,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';
import {DEFAULT_CURRENCY} from 'src/constants/currency';
import {
	constructDonateStocksUrl,
	constructDonateCryptoUrl,
	constructDonateUrl,
	constructGiftCardUrl
} from 'src/helpers/constructDonateUrl';

export const useSubmitDonation = () => {
	const config = useConfigContext();
	const customization = useCustomizationOrUndefined();

	const {
		frequency,
		donationAmount,
		setSubmitError,
		selectedPaymentMethod,
		stockAmount,
		stockSymbol,
		cryptoAmount,
		cryptoCurrency,
		privateNote,
		publicTestimony,
		giftCardCode,
		customFieldValues
	} = useWidgetContext();
	const {
		minDonationAmount,
		webhookToken,
		redeemGiftCardInFlow,
		designation,
		requireShareInfo
	} = useConfigContext();

	const submitDonation = useCallback(
		(event: JSXInternal.TargetedEvent<HTMLFormElement>) => {
			event.preventDefault();

			const target = config.completeDonationInNewTab ? '_blank' : '_self';

			const requiredField = (customization?.fields ?? []).find(
				(field) => field.required && !customFieldValues[field.heading]?.trim()
			);
			if (requiredField) {
				setSubmitError('Please fill in all required fields');
				return;
			}

			const customFieldResponses =
				Object.keys(customFieldValues).length > 0
					? JSON.stringify(customFieldValues)
					: undefined;

			const baseParameters = {
				methods: [selectedPaymentMethod],
				nonprofitSlug: config.nonprofitSlug,
				fundraiserSlug: config.fundraiserSlug,
				utmSource: config.utmSource,
				privateNote,
				publicTestimony,
				webhookToken,
				partnerMetadata: config.partnerMetadata,
				designation,
				requireShareInfo,
				customFieldResponses
			};
			switch (selectedPaymentMethod) {
				case PaymentMethod.CRYPTO:
					if (!cryptoAmount || !cryptoCurrency) {
						setSubmitError(`Please enter currency and amount`);
						break;
					}

					window.open(
						constructDonateCryptoUrl({
							cryptoAmount,
							cryptoCurrency,
							...baseParameters
						}),
						target
					);
					break;
				case PaymentMethod.STOCKS:
					if (!stockSymbol || !stockAmount) {
						setSubmitError(`Please enter the symbol and amount`);
						break;
					}

					window.open(
						constructDonateStocksUrl({
							stockSymbol,
							stockAmount,
							...baseParameters
						}),
						target
					);
					break;
				case PaymentMethod.GIFT_CARD:
					window.open(
						constructGiftCardUrl({
							redeemGiftCardInFlow,
							giftCardCode,
							...baseParameters,
							methods: undefined
						}),
						target
					);
					break;
				default:
					if (!donationAmount || donationAmount < minDonationAmount) {
						setSubmitError(
							`Amount must be at least ${DEFAULT_CURRENCY.symbol}${minDonationAmount}`
						);
						break;
					}

					window.open(
						constructDonateUrl({
							amount: donationAmount,
							frequency: OneTimeFrequencyMethods.includes(selectedPaymentMethod)
								? DonationFrequency.OneTime
								: frequency,
							...baseParameters
						}),
						target
					);
					break;
			}
		},
		[
			frequency,
			donationAmount,
			setSubmitError,
			selectedPaymentMethod,
			config,
			minDonationAmount,
			stockAmount,
			stockSymbol,
			cryptoAmount,
			cryptoCurrency,
			privateNote,
			publicTestimony,
			giftCardCode,
			webhookToken,
			redeemGiftCardInFlow,
			designation,
			requireShareInfo,
			customization,
			customFieldValues
		]
	);

	return submitDonation;
};
