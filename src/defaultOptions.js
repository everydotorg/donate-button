import WIDGET_MODE from './constants/widgetMode'

const everyMonthOptions = {
  // Configure action when the user submit the donation in the widget.
  // You can pass to us the following parameters to customize it or listen to the callback
  onSubmit: {
    charity: 'your-foundation',
    params: {
      share_info: 1,
      no_exit: 1,
    },
  },
  // Also supported:
  // onSubmit: ({amount, frequency}) => { console.log(amount, frequency)},
  currency: 'USD', // Currency to display
  monthly: {
    levels: [
      // Different choices in monthly donation
      {
        amount: '25',
        bgColor: '#BCD9DD',
      },
      {
        amount: '50',
        bgColor: '#F4BF86',
        default: true,
      },
      {
        amount: '100',
        bgColor: '#A0CBFE',
      },
      {
        amount: 'custom',
        bgColor: '#BCD9DD',
      },
    ],
  },
  oneTime: {
    levels: [10, 20, 30, 50, 100, 200], // Different choices in one time donation
    allowCustom: true, // Allow enter custom amount in one time donation
    bgColor: '#BCD9DD',
  },
  i18n: {
    // Different languages of the widget.
    // The keys used here (en, es) are the keys used to change the language via Attrs or Javascript.
    // By default we use the key "en".
    en: {
      company: {
        logo: 'https://assets.every.org/every-month/assets/logo.svg',
      },
      monthly: {
        logo: {
          header: 'Monthly donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        header: 'Become a regular supporter',
        info:
          'Monthy gifts help us focus on our mission and long-term impact',
        levels: [
          { amount: '5' },
          { amount: '10' },
          { amount: '20' },
          { amount: '50' },
          { amount: '100' },
          { amount: '200' },
        ],
        custom: {
          label: 'Custom',
          placeholder: 'Enter amount',
        },
        button: 'Donate {{amount}} every month',
        switch: 'Or make a <action>One Time Donation</action>',
      },
      oneTime: {
        logo: {
          header: 'One time donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        name: 'One time donation',
        header: 'Help us make a difference',
        info: 'Thank you for your support!',
        custom: {
          placeholder: 'Enter custom amount',
        },
        button: 'Donate {{amount}}',
        switch: 'Or make a <action>Monthly donation</action>',
      },
      footer:
        'You will be redirected to a secure page on Every.org to complete your donation.',
    },
  },
}

export default everyMonthOptions
