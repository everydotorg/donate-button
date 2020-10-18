import React, { useState } from 'react'
import './style.css'

import Donations from './Donations';
import OptionsContext from './optionsContext';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  const [monthlyDonation, setMonthlyDonation] = useState(true);
  
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <OptionsContext.Provider value={options}>
        <div className="widget">
          <Donations 
            monthlyDonation={monthlyDonation}
            setMonthlyDonation={setMonthlyDonation}
          />
          <div className="images"></div>
          <div className="info"></div>
        </div>
      </OptionsContext.Provider>
    </div>
  )
}

export default EveryMonth
