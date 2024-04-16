import {Fragment} from 'preact/jsx-runtime';
import {faqLinkCss} from 'src/components/widget/components/Faq/styles';
import {DisbursementType, Nonprofit} from 'src/components/widget/types/Nonprofit';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export function getNonprofitName(nonprofit: Nonprofit) {
	return nonprofit.metadata?.prefixWithThe
		? `the ${nonprofit.name}`
		: nonprofit.name;
}

export function getDisbursementDescription(nonprofit: Nonprofit) {
	if (nonprofit.disbursementType === DisbursementType.STRIPE_CONNECT) {
    return <span>On a weekly basis, Every.org grants to {nonprofit.name}.</span>;
  }

  if (nonprofit.disbursementType === DisbursementType.MANUAL) {
    return (
      <span>
        Every.org grants directly to {nonprofit.name} on a regular basis.
      </span>
    );
  }

  const isPayPal =
    nonprofit.disbursementType === DisbursementType.PAYPAL_GRANTS;

	return (
		<span>
			We then partner with {isPayPal ? "PayPal Grants" : "Network for Good"} to grant to {nonprofit.name} on a{' '}
			<a
				className={faqLinkCss}
				href="https://networkforgood.zendesk.com/hc/en-us/articles/115006168307-How-does-my-organization-get-paid-"
			>
				monthly basis
			</a>
			{isPayPal ? " (or semiannually for balance under $100)." : "."}
		</span>
	);
}

export function getNfgDisclaimer(nonprofit: Nonprofit) {
	if (!nonprofit.disbursementType ||
    nonprofit.disbursementType === DisbursementType.NFG_BATCH_FILE) {
		return (
			<p>
				{nonprofit.name} has not added bank deposit info to Every.org yet, so we
				currently grant to them through Network for Good, who charges a 2.25%
				disbursement fee.
			</p>
		);
	}

	return null;
}

export function getFeeDescriptionBody(
	paymentMethod: PaymentMethod,
	nonprofit: Nonprofit
) {
	switch (paymentMethod) {
		case PaymentMethod.PAYPAL:
			return (
				<Fragment>
					<p>
						PayPal charges 1.99% + $0.49 for each transaction. There’s an
						additional 1.5% fee for non-US donors.
					</p>
					{getNfgDisclaimer(nonprofit)}
					{encourageBankDonation(nonprofit)}
				</Fragment>
			);
		case PaymentMethod.CREDIT_CARD:
		case PaymentMethod.PAYMENT_REQUEST:
			return (
				<Fragment>
					<p>
						Visa and Mastercard charge 2.2% + $0.30 for each transaction. Amex
						charges a 3.5% flat fee. There’s an additional 1% fee for non-US
						cards.
					</p>
					{getNfgDisclaimer(nonprofit)}
					{encourageBankDonation(nonprofit)}
				</Fragment>
			);
		case PaymentMethod.BANK:
			return (
				<p>
					Every.org currently covers all fees for donations made with a bank, so
					100% of your gift reaches {nonprofit.name}.
				</p>
			);
		case PaymentMethod.VENMO:
			return (
				<Fragment>
					<p>
						Venmo charges 1.99% + $0.49 for each transaction. There’s an
						additional 1.5% fee for non-US donors.
					</p>
					{getNfgDisclaimer(nonprofit)}
					{encourageBankDonation(nonprofit)}
				</Fragment>
			);
		case PaymentMethod.CRYPTO:
			return (
				<Fragment>
					<p>
						Our exchanges generally charge a 1% flat fee to automatically
						liquidate cryptocurrency. For large donations worth over $5k, you
						have the option to email crypto@every.org to request an address and
						we can do a manual conversion to get the best rates possible
						(usually 0.1%-0.4%). Or you are welcome to donate here with the 1%
						fee.
					</p>
					{getNfgDisclaimer(nonprofit)}
				</Fragment>
			);
		case PaymentMethod.STOCKS:
			return (
				<Fragment>
					<p>
						Every.org covers all brokerage fees for commonly traded stocks! For
						mutual funds, the First Republic brokerage fee is usually 0.1% of
						the principle, with a $30 minimum and $150 maximum. Some slippage
						may occur between when you donate and when we sell making the final
						amount different from what you donate.
					</p>
					{getNfgDisclaimer(nonprofit)}
				</Fragment>
			);
		case PaymentMethod.DAF:
			return (
				<Fragment>
					<p>We do not charge any fees, but your DAF provider may have fees.</p>
					{getNfgDisclaimer(nonprofit)}
				</Fragment>
			);
		default:
			return (
				<Fragment>
					<p>However, there are third-party fees.</p>
					{getNfgDisclaimer(nonprofit)}
					{encourageBankDonation(nonprofit)}
				</Fragment>
			);
	}
}

export function encourageBankDonation(nonprofit: Nonprofit) {
	return (
		<p>
			Don’t like fees? Neither do we! Donate via bank and then 100% of your gift
			will reach {nonprofit.name}.
		</p>
	);
}

export function getFeeDescription(
	paymentMethod: PaymentMethod,
	nonprofit: Nonprofit
) {
	return (
		<Fragment>
			<p>
				Every.org is free for donors and nonprofits, with no platform fees -
				instead we ask for a completely optional tip.
			</p>
			{getFeeDescriptionBody(paymentMethod, nonprofit)}
		</Fragment>
	);
}
