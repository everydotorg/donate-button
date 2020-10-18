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
        logo: {
          header: 'Monthly donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        header: 'Support the Fungi',
        info: 'Monthy gifts help us focus on our mission and long-term impact.',
        levels: [
          'Mushroom Member',
          'Fungi Lover',
          'Mycelium Expander'
        ],
        custom: {
          label: 'Custom',
          placeholder: 'Enter amount'
        },
        button: 'Donate ${{amount}} every month',
        switch: 'Or make a <action>One Time Donation</action>'
      },
      oneTime: {
        logo: {
          header: 'One time donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        name: 'One time donation',
        header: 'Your support makes a difference!',
        info: 'Thank you for supporting the mission of the foundation!',
        custom: {
          placeholder: 'Enter custom amount'
        },
        button: 'Donate ${{amount}}',
        switch: 'Or make a <action>Monthly donation</action>'
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
