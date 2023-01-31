import {Fragment} from 'preact/jsx-runtime';
import {faqLinkCss} from 'src/components/widget/components/Faq/styles';
import {Nonprofit} from 'src/components/widget/types/Nonprofit';

export function getDisbursementDescription(nonprofit: Nonprofit) {
	// 'directDisbursement' missing in nonprofit response
	//
	// if (nonprofit.directDisbursement) {
	// 	return (
	// 		<span>We then grant directly to {nonprofit.name} on a weekly basis.</span>
	// 	);
	// }

	return (
		<span>
			We then partner with Network for Good to grant to {nonprofit.name} on a{' '}
			<a
				className={faqLinkCss}
				href="https://networkforgood.zendesk.com/hc/en-us/articles/115006168307-How-does-my-organization-get-paid-"
			>
				monthly basis
			</a>
			.
		</span>
	);
}

export function getNfgDisclaimer(nonprofit: Nonprofit) {
	// 'directDisbursement' missing in nonprofit response
	//
	// if (!nonprofit.directDisbursement) {
	// 	return (
	// 		<p>
	// 			{nonprofit.name} has not added bank deposit info to Every.org yet, so we
	// 			currently grant to them through Network for Good, who charges a 2.25%
	// 			disbursement fee.
	// 		</p>
	// 	);
	// }

	return null;
}

export function getFeeDescriptionBody(
	// paymentRoute: string,
	nonprofit: Nonprofit
) {
	// not implemented: switch case for different payment methods
	return (
		<Fragment>
			<p>However, there are third-party fees.</p>
			{getNfgDisclaimer(nonprofit)}
			{encourageBankDonation(nonprofit)}
		</Fragment>
	);
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
	// paymentRoute: string,
	nonprofit: Nonprofit
) {
	return (
		<Fragment>
			<p>
				Every.org is free for donors and nonprofits, with no platform fees -
				instead we ask for a completely optional tip.
			</p>
			{getFeeDescriptionBody(
				// paymentRoute,
				nonprofit
			)}
		</Fragment>
	);
}
