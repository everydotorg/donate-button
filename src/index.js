import everyMonth from './everyMonthWidget'
import * as serviceWorker from './serviceWorker'

// This code would normally be in the host webpage
const everyMonthOptions = {
  monthly: {
    levels: [
      { label: 'Sponge Supporter', amount: '25' },
      { label: 'Friend of the reef', amount: '50' },
      { label: 'Coral Champion', amount: '100' },
    ],
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

// init
// everyMonth.init(everyMonthOptions)

// init showing
everyMonth.init({ ...everyMonthOptions, show: true })

// Show/Hide
// everyMonth.hide()
// everyMonth.show()

// for dev
window.everyMonth = everyMonth

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
