import React, { useEffect, useContext, useLayoutEffect } from 'react'
import { useRef } from 'react'
import './description.css';
import DonationsContext from '../../contexts/donationsContext';
import useI18n from '../../hooks/useI18n';
import OptionsContext from '../../contexts/optionsContext';
import { replaceTagWithComponent } from '../../helpers/interpolation';
import { getCustomDonationLevel } from '../../helpers/donation-level';

const getBoldFormatted = (text, link) => {
    const comp = 'strong';
    const props = {};
    const tag = 'bold';

    return replaceTagWithComponent(text, tag, comp, props);
}

const getDescriptionText = (lang, monthlyDonation, donationAmount) => {
    if(monthlyDonation) {
        const level = getCustomDonationLevel(lang.monthly.levels, donationAmount);
        console.log(level);
        return (
            <>
                <p className='t-heading-secondary'>{level.description1 && getBoldFormatted(level.description1)}</p>
                {level.description2 && <p className='t-heading-secondary'>{level.description2}</p>}
            </>
        )
    }

    return <p className='t-heading-secondary'>{lang.oneTime.description}</p>
}

const Description = () => {
    const descrRef = useRef(null);
    const {donationAmount, monthlyDonation} = useContext(DonationsContext);
    const options = useContext(OptionsContext);
    const lang = useI18n();

    useLayoutEffect(() => {
        if(descrRef.current){
            if(monthlyDonation) {
                descrRef.current.style.background = getCustomDonationLevel(options.monthly.levels, donationAmount).bgColor;
            } else {
                descrRef.current.style.background = options.oneTime.bgColor;
            }
        }
    }, [donationAmount, monthlyDonation, options]);


    console.log(descrRef.current);

    return (
        <div ref={descrRef} className="description">
            {getDescriptionText(lang, monthlyDonation, donationAmount)}
        </div>
    )
}

export default Description
