import React from 'react'
import ReactDOM from 'react-dom'
import EveryMonth from './EveryMonth/EveryMonth'
import * as serviceWorker from './serviceWorker'

window.everyMonth = {
  show: (element, options) => {
    const root = document.createElement('div')
    element.attachShadow({ mode: 'closed' }).appendChild(root)
    ReactDOM.render(
      <React.StrictMode>
        <EveryMonth options={options} />
      </React.StrictMode>,
      root
    )
  }
}

// This code would normally be in the host webpage
const everyMonthOptions = {
  monthly: {
    levels: [{ name: 'level1', amount: '25' }],
    allowCustom: true
  },
  oneTime: {
    levels: [5, 10, 20, 50, 100, 200],
    allowCustom: true
  },
  i18n: {
    en: {
      monthly: {
        header: 'Support the Fungi',
        info: 'Monthly donations help...',
        levels: {
          level1: 'Mushroom Meber'
        },
        custom: {
          label: 'Custom',
          placeholder: 'Enter amount'
        },
        button: 'Donate {{amount, currency}}',
        switch: 'Or make a <1>Monthly donation</1>'
      },
      oneTime: {
        header: 'Every dollar helps!',
        info: 'Message here',
        custom: {
          placeholder: 'Enter custom amount'
        },
        button: 'Donate {{amount, currency}}',
        switch: 'Or make a <1>One time donation</1>'
      }
    }
  }
}
window.everyMonth.show(
  document.getElementById('every-month'),
  everyMonthOptions
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
