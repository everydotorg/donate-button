import React, { useState } from 'react'
import './style.css'

import Logo from './Logo';
import Donations from './Donations';
import ToggleDonationType from './ToggleDonationType';
import OptionsContext from './optionsContext';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  
  
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <OptionsContext.Provider value={options}>
        <div className="widget">
          <div className="donations">
            <Logo />
            <div className="donations__header">
              <h1 className="t-heading-primary">This is a headline, which could be two lines long.</h1>
              <h2 className="t-heading-secondary">Monthly gifts help nonprofits focus on their mission and long-term impact.</h2>
            </div>
            <Donations monthlyDonation={monthlyDonation}/>
            <ToggleDonationType handleClick={() => setMonthlyDonation(!monthlyDonation)}>
              {monthlyDonation ? 'One time donation' : 'Monthly donation'}
            </ToggleDonationType>
          </div>
          <div className="images"></div>
          <div className="info"></div>
        </div>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
