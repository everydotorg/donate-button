import React from 'react'
import './images.css';
import { useContext } from 'react';
import OptionsContext from '../../contexts/optionsContext';
import DonationsContext from '../../contexts/donationsContext';

const Images = ({image}) => {
    const options = useContext(OptionsContext);
    const {monthlyDonation} = useContext(DonationsContext);

    const imageBg = monthlyDonation ? image : options.oneTime.img;
    return (
        <div className='images' style={{backgroundImage: `url(${imageBg})`}}>
            
        </div>
    )
}

export default Images
