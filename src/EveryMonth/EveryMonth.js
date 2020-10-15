import React from 'react'
import logo from './logo.svg'
import './style.css'

function EveryMonth({ options, hide }) {
  return (
    <div className="wrapper">
      <div className="widget" onClick={()=> console.log('s')}>
        <pre>{JSON.stringify(options, null, 2)}</pre>
        <img src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default EveryMonth
