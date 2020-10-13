import React from 'react'
import logo from './logo.svg'
import styles from './everyMonthStyles'

function EveryMonth({options}) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.widget}>
        <pre>{JSON.stringify(options, null, 2)}</pre>
        <img src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default EveryMonth
