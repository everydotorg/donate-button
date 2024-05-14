import {useCallback} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {
	AvailablePaymentMethods,
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
		giftCardCode
	} = useWidgetContext();
	const {minDonationAmount, webhookToken, redeemGiftCardInFlow} =
		useConfigContext();

	const submitDonation = useCallback(
		(event: JSXInternal.TargetedEvent<HTMLFormElement>) => {
			event.preventDefault();

			const target = config.completeDonationInNewTab ? '_blank' : '_self';

			const baseParameters = {
				methods: [selectedPaymentMethod],
				nonprofitSlug: config.nonprofitSlug,
				fundraiserSlug: config.fundraiserSlug,
				utmSource: config.utmSource,
				privateNote,
				webhookToken
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
							`The minimum donation amount is ${DEFAULT_CURRENCY.symbol}${minDonationAmount}`
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
			giftCardCode,
			webhookToken,
			redeemGiftCardInFlow
		]
	);

	return submitDonation;
};
