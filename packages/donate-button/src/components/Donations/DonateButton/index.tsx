import {useContext} from 'preact/hooks';
import Button from 'src/components/Button';
import DonationsContext from 'src/contexts/donations-context';
import OptionsContext from 'src/contexts/options-context';
import {replaceKeys} from 'src/helpers/interpolation';
import useI18n from 'src/hooks/use-i18n';

const getButtonTextFormatted = (
	text: string,
	currency: string,
	amount?: string
) => {
	if (amount && !Number.isNaN(Number(amount))) {
		return replaceKeys({amount: `$${amount} ${currency}`}, text);
	}

	return replaceKeys({amount: ''}, text);
};

interface DonateButtonProps {
	extraClasses?: string[];
	monthlyDonation: boolean;
}
const DonateButton = ({
	monthlyDonation,
	extraClasses = []
}: DonateButtonProps) => {
	const lang = useI18n();
	const donationsContextValue = useContext(DonationsContext);
	const {currency} = useContext(OptionsContext);
	const formText = monthlyDonation ? lang.monthly : lang.oneTime;
	const donationAmount = donationsContextValue?.donationAmount;

	return (
		<Button typeSubmit extraClasses={extraClasses}>
			{getButtonTextFormatted(formText.button, currency, donationAmount)}
		</Button>
	);
};

export default DonateButton;
