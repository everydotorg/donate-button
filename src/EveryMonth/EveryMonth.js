import React, { useState } from 'react'
import './style.css'

import Donations from './Donations';
import OptionsContext from '../contexts/optionsContext';
import Description from './Description';
import DonationsContext from '../contexts/donationsContext';
import Images from './Images';
import WIDGET_MODE from '../constants/widgetMode';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  const [donationAmount, setDonationAmount] = useState('25');
  const [customDonation, setCustomDonation] = useState('');
  
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <OptionsContext.Provider value={options}>
        <DonationsContext.Provider 
          value={{
            monthlyDonation,
            setMonthlyDonation,
            donationAmount,
            setDonationAmount,
            customDonation,
            setCustomDonation
          }}
        >
          {options.mode === WIDGET_MODE.SPLIT_PANEL && 
            <div className="widget widget--split">        
              <Donations 
                monthlyDonation={monthlyDonation}
                setMonthlyDonation={setMonthlyDonation}
              />
              <Images />
              <Description />   
            </div>
          }
          { options.mode === WIDGET_MODE.SINGLE &&
              <div className="widget widget--single">        
              <Donations 
                monthlyDonation={monthlyDonation}
                setMonthlyDonation={setMonthlyDonation}
              />
            </div>
          }

      </DonationsContext.Provider>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
