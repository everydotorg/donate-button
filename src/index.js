import everyMonth from './everyMonthWidget'
import * as serviceWorker from './serviceWorker'

// This code would normally be in the host webpage
const everyMonthOptions = {
  monthly: {
    levels: [
      { amount: '25', bgColor: '#BCD9DD' },
      { amount: '50', bgColor: '#F4BF86' },
      { amount: '100', bgColor: '#A0CBFE' },
    ],
    allowCustom: true,
  },
  oneTime: {
    levels: [5, 10, 20, 50, 100, 200],
    allowCustom: true,
    bgColor: '#BCD9DD'
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
          {
            amount: '25',
            name: 'Mushroom Member',
            description1: 'As a <bold>Mushroom Member:</bold> You will help us continue to teach and inspire thousands of people about the fantastic world of Fungi.',
            description2: 'We explore wild places of earth to document Fungi for conservation, habitat protection & livelihoods of those who depend on them'
          },
          {
            amount: '50',
            name: 'Fungi Lover',
            description1: 'As a <bold>Fungi Lover:</bold> You will help us explore and document hundreds of species of fungi in some of the oldest Patagonian Temperate Rainforests.',
            description2: 'We explore wild places of earth to document Fungi for conservation, habitat protection & livelihoods of those who depend on them'
          },
            {
            amount: '100',
            name: 'Mycelium Expander',
            description1: 'As a <bold>Mycelium Expander:</bold> you will help us develop the first dynamic map of known ancestral uses of fungi.',
            description2: 'We explore wild places of earth to document Fungi for conservation, habitat protection & livelihoods of those who depend on them'
          },
        ],
        custom: {
          label: 'Custom',
          placeholder: 'Enter amount',
        },
        button: 'Donate {{amount}} every month',
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
        description: 'We explore wild places of earth to document Fungi for conservation, habitat protection & livelihoods of those who depend on them',
        button: 'Donate {{amount}}',
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
