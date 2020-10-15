import React from 'react'
import logo from './logo.svg'
import './style.css'

function EveryMonth({ options, hide }) {
  const hideOnWrapperClick = e => e.target === e.currentTarget && hide()
  return (
    <div className="wrapper" onClick={hideOnWrapperClick}>
      <div className="widget">
        <pre>{JSON.stringify(options, null, 2)}</pre>
        <img src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default EveryMonth
