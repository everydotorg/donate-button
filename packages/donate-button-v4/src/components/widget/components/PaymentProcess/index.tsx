import cxs from 'cxs';
import {JSXInternal} from 'preact/src/jsx';
import {GridCard} from 'src/components/widget/components/GridCard';
import {DonationAmount} from 'src/components/widget/components/PaymentProcess/DonationAmount';
import {Frequency} from 'src/components/widget/components/PaymentProcess/Frequency';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	formCss,
	cardCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {BREAKPOINTS} from 'src/components/widget/theme/breakpoints';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import {DonationFrequency} from 'src/components/widget/types/DonationFrequency';
import {DEFAULT_CURRENCY} from 'src/constants/currency';
import constructEveryUrl from 'src/helpers/constructEveryUrl';

const getSubmitButtonText = (
	donationAmount: number | undefined,
	frequency: DonationFrequency
) => {
	if (frequency === '') {
		return 'Select frequency';
	}

	if (!donationAmount) {
		return 'Choose an amount';
	}

	if (Number.isNaN(donationAmount)) {
		return 'Enter an amount to donate';
	}

	let text = `Donate ${DEFAULT_CURRENCY.symbol}${donationAmount}`;

	if (frequency === DonationFrequency.Monthly) {
		text = text.concat(` monthly`);
	}

	return text;
};

export const PaymentProcess = () => {
	const config = useConfigContext();

	const {frequency, donationAmount, setSubmitError, selectedPaymentMethod} =
		useWidgetContext();
	const {minDonationAmount} = useConfigContext();

	const submitDonation = (
		event: JSXInternal.TargetedEvent<HTMLFormElement>
	) => {
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
	};

	return (
		<GridCard className={cardCss}>
			<form className={formCss} onSubmit={submitDonation}>
				<LargePaymentMethodSelect />
				<div
					className={cxs({
						...verticalStackCss.cxs(Spacing.XL),
						padding: '0px',
						[BREAKPOINTS.TabletLandscapeUp]: {
							padding: Spacing.XXL
						}
					})}
				>
					<SmallPaymentMethodSelect />
					<Frequency />
					<DonationAmount />
					<SubmitButton
						disabled={
							frequency === DonationFrequency.Unselected ||
							!donationAmount ||
							Number.isNaN(donationAmount)
						}
					>
						{getSubmitButtonText(donationAmount, frequency)}
					</SubmitButton>
					<RedirectNotice />
				</div>
			</form>
		</GridCard>
	);
};
