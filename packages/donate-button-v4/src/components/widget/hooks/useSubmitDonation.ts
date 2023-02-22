import {useCallback} from 'preact/hooks';
import {JSXInternal} from 'preact/src/jsx';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {DEFAULT_CURRENCY} from 'src/constants/currency';
import constructEveryUrl from 'src/helpers/constructEveryUrl';

export const useSubmitDonation = () => {
	const config = useConfigContext();

	const {frequency, donationAmount, setSubmitError, selectedPaymentMethod} =
		useWidgetContext();
	const {minDonationAmount} = useConfigContext();

	const submitDonation = useCallback(
		(event: JSXInternal.TargetedEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!donationAmount || donationAmount < minDonationAmount) {
				setSubmitError(
					`The minimum donation amount is ${DEFAULT_CURRENCY.symbol}${minDonationAmount}`
				);
				return;
			}

			const options = {
				amount: donationAmount,
				frequency,
				method: selectedPaymentMethod,
				nonprofitSlug: config.nonprofitSlug
			};

			if (config.fundraiserSlug) {
				Object.assign(options, {
					fundraiserSlug: config.fundraiserSlug
				});
			}

			const target = config.completeDonationInNewTab ? '_blank' : '_self';

			window.open(constructEveryUrl(options), target);
		},
		[
			frequency,
			donationAmount,
			setSubmitError,
			selectedPaymentMethod,
			config,
			minDonationAmount
		]
	);

	return submitDonation;
};
