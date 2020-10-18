import React, { useState } from 'react'
import './style.css'

import Logo from './Logo';
import Donations from './Donations';
import ToggleDonationType from './ToggleDonationType';
import OptionsContext from './optionsContext';
import Header from './Header';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <OptionsContext.Provider value={options}>
        <div className="widget">
          <div className="donations">
            <Logo  monthlyDonation={monthlyDonation} />
            <div className="donations__header">
              <Header  monthlyDonation={monthlyDonation} />
            </div>
            <Donations monthlyDonation={monthlyDonation}/>
            <ToggleDonationType handleClick={() => setMonthlyDonation(!monthlyDonation)} monthlyDonation={monthlyDonation} />
          </div>
          <div className="images"></div>
          <div className="info"></div>
        </div>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
