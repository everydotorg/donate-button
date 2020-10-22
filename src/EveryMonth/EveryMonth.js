import React, { useState, useEffect } from 'react'
import './style.css'

import Donations from './Donations';
import OptionsContext from '../contexts/optionsContext';
import Description from './Description';
import DonationsContext from '../contexts/donationsContext';
import Images from './Images';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  const [donationAmount, setDonationAmount] = useState('25');
  const [customDonation, setCustomDonation] = useState('');
  const [rightPanelClasses, setRightPanelClasses] = useState([])

  const setDonationAmountWithAnimation = (value) => {
    setRightPanelClasses(['fadeInDown']);

    setTimeout(() => {
      setRightPanelClasses([])
    }, 400) // animation duration

    setTimeout(() => {
      setDonationAmount(value);
    }, 200) // 50% animation (container is hidden)
  }

  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <OptionsContext.Provider value={options}>
        <DonationsContext.Provider 
          value={{
            monthlyDonation,
            setMonthlyDonation,
            donationAmount,
            setDonationAmount,
            setDonationAmountWithAnimation,
            customDonation,
            setCustomDonation
          }}
        >
        <div className="widget">
          <Donations 
            monthlyDonation={monthlyDonation}
            setMonthlyDonation={setMonthlyDonation}
          />
          <div className={['right-panel'].concat(rightPanelClasses).join(' ')}>
            <Images />
            <Description />
          </div>
        </div>
      </DonationsContext.Provider>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
