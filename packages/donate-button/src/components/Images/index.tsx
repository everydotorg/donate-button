import './images.css';
import {useContext} from 'preact/hooks';

import DonationsContext from '../../contexts/donationsContext';
import OptionsContext from '../../contexts/optionsContext';
const Images = ({image}) => {
	const options = useContext(OptionsContext);
	const {monthlyDonation} = useContext(DonationsContext);

	const imageBg = monthlyDonation ? image : options.oneTime.img;
	return (
		<div
			className="images"
			style={{
				backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 24.02%), url(${imageBg})`
			}}
		></div>
	);
};

export default Images;
