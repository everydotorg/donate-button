import {useContext} from 'preact/hooks';
import DonationsContext from 'src/contexts/donations-context';
import OptionsContext from 'src/contexts/options-context';

import 'src/components/Images/images.css';

const Images = ({image}: {image: string}) => {
	const options = useContext(OptionsContext);
	const donationsContextValue = useContext(DonationsContext);
	const monthlyDonation = donationsContextValue?.monthlyDonation ?? true;

	const imageBg = monthlyDonation ? image : options.oneTime.img;
	if (!imageBg) {
		return null;
	}

	return (
		<div
			className="images"
			style={{
				backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 24.02%), url(${imageBg})`
			}}
		/>
	);
};

export default Images;
