import React from 'react'
import './style.css'

import Logo from './Logo';
import Donations from './Donations';

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <div className="widget">
        <div className="donations">
          <Logo />
          <div className="donations__header">
            <h1 className="t-heading-primary">This is a headline, which could be two lines long.</h1>
            <h2 className="t-heading-secondary">Monthly gifts help nonprofits focus on their mission and long-term impact.</h2>
          </div>
          <Donations />
        </div>
        <div className="images"></div>
        <div className="info"></div>
      </div>
    </div>
  )
}

export default EveryMonth
