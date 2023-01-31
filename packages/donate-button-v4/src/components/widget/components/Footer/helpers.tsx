import {Nonprofit} from 'src/components/widget/types/Nonprofit';

export const getTaxDeductibleStatement = (nonprofit: Nonprofit) => {
	return (
		<span>
			100% of your donation is tax-deductible to the extent allowed by US law.
			Your donation is made to Every.org, a tax-exempt US 501(c)(3) charity that
			grants unrestricted funds to {nonprofit.name} on your behalf.
		</span>
	);
};
