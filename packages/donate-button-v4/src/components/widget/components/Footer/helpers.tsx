import {Fundraiser} from 'src/components/widget/types/Fundraiser';
import {Nonprofit} from 'src/components/widget/types/Nonprofit';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';

export function getGranteeName(
	nonprofit: Nonprofit,
	parentNonprofit?: Nonprofit
) {
	if (nonprofit.metadata?.granteeName) {
		return nonprofit.metadata?.granteeName;
	}

	const name = nonprofit.metadata?.prefixWithThe
		? `the ${nonprofit.name}`
		: nonprofit.name;
	if (parentNonprofit) {
		return `the fund for ${name} hosted at ${parentNonprofit.name}`;
	}

	return name;
}

export function isOfficialFundraiser(fundraiser: Fundraiser): boolean {
	return fundraiser.nonprofitId === fundraiser.creatorNonprofitId;
}

const DAF_DEDUCTIBLE_STATEMENT =
	'If you use a Donor Advised Fund (DAF), your receipt from Every.org will not be tax-deductible as the tax deduction was already received at the time you contributed to your DAF. For any other payment method, you will get a tax-deductible receipt emailed to you';

export const getTaxDeductibleStatement = (
	nonprofit: Nonprofit,
	fundraiser?: Fundraiser,
	parentNonprofit?: Nonprofit,
	paymentOption?: PaymentMethod
) => {
	const granteeName = getGranteeName(nonprofit, parentNonprofit);
	const deductibleStatement =
		paymentOption === PaymentMethod.DAF
			? DAF_DEDUCTIBLE_STATEMENT
			: '100% of your donation is tax-deductible to the extent allowed by US law';

	const main = `${deductibleStatement}. Your donation is made to Every.org, a tax-exempt US 501(c)(3) charity that
      grants unrestricted funds to ${granteeName} on your behalf. 
      As a legal matter, Every.org must provide any donations to ${granteeName} on an
      unrestricted basis, regardless of any designations or restrictions made by
      you.`;

	const isUnofficialFundraiser =
		fundraiser && !isOfficialFundraiser(fundraiser);

	let noPermission = '';

	const nonprofitNameWithVerb = `${nonprofit.name} has`;
	if (nonprofit.hasAdmin && isUnofficialFundraiser) {
		noPermission = `Please note ${nonprofitNameWithVerb} not reviewed or approved the content of this peer-to-peer fundraiser.`;
	} else if (!nonprofit.hasAdmin && !isUnofficialFundraiser) {
		noPermission = `Please note ${nonprofitNameWithVerb} not provided permission for this solicitation.`;
	} else if (!nonprofit.hasAdmin && isUnofficialFundraiser) {
		noPermission = `Please note ${nonprofitNameWithVerb} not provided permission for this solicitation or reviewed or approved the content of this peer-to-peer fundraiser.`;
	}

	const customTaxDeductible = nonprofit.metadata?.customTaxDeductible ?? '';

	return (
		<span>
			{main} {noPermission} {customTaxDeductible}
		</span>
	);
};
