import {Fundraiser} from 'src/components/widget/types/Fundraiser';
import {Nonprofit} from 'src/components/widget/types/Nonprofit';

export function isOfficialFundraiser(fundraiser: Fundraiser): boolean {
	return fundraiser.nonprofitId === fundraiser.creatorNonprofitId;
}

export const getTaxDeductibleStatement = (
	nonprofit: Nonprofit,
	fundraiser?: Fundraiser
) => {
	const base = `100% of your donation is tax-deductible to the extent allowed by US law. 
      Your donation is made to Every.org, a tax-exempt US 501(c)(3) charity that
      grants unrestricted funds to ${nonprofit.name} on your behalf. 
      As a legal matter, Every.org must provide any donations to ${nonprofit.name} on an
      unrestricted basis, regardless of any designations or restrictions made by
      you.`;

	const isUnofficialFundraiser =
		fundraiser && !isOfficialFundraiser(fundraiser);

	let end = '';

	if (nonprofit.hasAdmin && isUnofficialFundraiser) {
		end = `Please note ${nonprofit.name} has not reviewed or approved the content of this peer-to-peer fundraiser.`;
	} else if (!nonprofit.hasAdmin && !isUnofficialFundraiser) {
		end = `Please note ${nonprofit.name} has not provided permission for this solicitation.`;
	} else if (!nonprofit.hasAdmin && isUnofficialFundraiser) {
		end = `Please note ${nonprofit.name} has not provided permission for this solicitation or reviewed or approved the content of this peer-to-peer fundraiser.`;
	}

	return (
		<span>
			{base} {end}
		</span>
	);
};
