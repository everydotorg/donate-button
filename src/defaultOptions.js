import WIDGET_MODE from './constants/widgetMode'

const everyMonthOptions = {
  currency: 'USD', // Currency to display
  monthly: {
    levels: [ // Different choices in monthly donation
      { amount: '25', bgColor: '#BCD9DD', img: "https://i.ibb.co/m4n7LDq/1.jpg" },
      { amount: '50', bgColor: '#F4BF86', img:  "https://i.ibb.co/jJ18cFn/2.jpg"},
      { amount: '100', bgColor: '#A0CBFE', img:  "https://i.ibb.co/qkjmDtC/3.jpg"},
    ],
    allowCustom: true, // Allow enter custom amount in monthly donation
    custom: { bgColor: '#BCD9DD', img: 'https://i.ibb.co/xXKS8r7/4.jpg'}
  },
  oneTime: {
    levels: [10, 20, 30, 50, 100, 200], // Different choices in one time donation
    allowCustom: true, // Allow enter custom amount in one time donation
    bgColor: '#BCD9DD',
    img: 'https://i.ibb.co/KL1KX7P/5.jpg'
  },
  // Configure action when the user submit the donation in the widget.
  // You can pass to us the following parameters to customize it or listen to the callback
  onSubmit: {
    charity: 'ffungi',
    params: {
      share_info: 1,
      no_exit: 1,
    }
  },
  // Both ways supported
  // onSubmit: ({amount, frequency}) => { console.log(amount, frequency)},
  i18n: {
    // Different languages of the widget.
    // The keys used here (en, es) are the keys used to change the language via Attrs or Javascript.
    // By default we use the key "en".
    en: {
      company: {
        logo: 'https://i.ibb.co/1bQwr6L/Logo-FFungi.jpg',
        name: 'Fungi Foundation',
        location: 'Santiago, Chile',
      },
      monthly: {
        logo: {
          header: 'Monthly donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        header: 'Support the Fungi!',
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
          description1: "With your support we will promote the 3F's globally to include fungi in language, it is flora, fauna & funga!",
          description2: 'We explore wild places of earth to document Fungi for conservation, habitat protection & livelihoods of those who depend on them.'
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
      },
      footer: 'Fungi Foundation uses our trusted partner Every.org, to power donation processing. You will be directed to Every.org to complete your donation.'
    },
    es: {
      company: {
        logo: 'https://i.ibb.co/1bQwr6L/Logo-FFungi.jpg',
        name: 'Fundación Fungi',
        location: 'Santiago, Chile',
      },
      monthly: {
        logo: {
          header: 'Donación mensual',
          text: 'en <link>every.org</link>',
          link: 'https://every.org',
        },
        header: '¡Apoya los hongos!',
        info: 'Las ayudas mensuales nos permiten centrarnos en nuestra misión y en el impacto a largo plazo',
        levels: [
          {
            amount: '25',
            name: 'Miembro hongo',
            description1: 'Como <bold>Miembro Hongo:</bold> Nos ayudarás a seguir enseñando e inspirando a miles de personas sobre el fantástico mundo de los hongos.',
            description2: 'Exploramos lugares salvajes de la tierra para documentar los hongos para su conservación, la protección de su hábitat y las formas de vida de las personas que dependen de ellos.'
          },
          {
            amount: '50',
            name: 'Amante Fungi',
            description1: 'Como <bold>Amante Fungi:</bold> Nos ayudarás a explorar y documentar especies de hongos en algunos de los más antiguos bosques templados de la Patagonia.',
            description2: 'Exploramos lugares salvajes de la tierra para documentar los hongos para su conservación, la protección de su hábitat y las formas de vida de las personas que dependen de ellos.'
          },
            {
            amount: '100',
            name: 'Expansor del micelio',
            description1: 'Como <bold>Expansor/a del Micelio:</bold> Nos ayudarás a desarrollar el primer mapa dinámico de los usos ancestrales conocidos de los hongos.',
            description2: 'Exploramos lugares salvajes de la tierra para documentar los hongos para su conservación, la protección de su hábitat y las formas de vida de las personas que dependen de ellos.'
          },
        ],
        custom: {
          label: 'Personalizado',
          placeholder: 'Ingrese el monto',
          description1: 'Con tu aporte promoveremos las 3F a nivel global para incluir a los hongos en el lenguaje, ¡es flora, fauna y funga!',
          description2: 'Exploramos lugares salvajes de la tierra para documentar los hongos para su conservación, la protección de su hábitat y las formas de vida de las personas que dependen de ellos.'
        },
        button: 'Donar {{amount}} cada mes',
        switch: 'O haga una <action>Donación única</action>'
      },
      oneTime: {
        logo: {
          header: 'Donación única',
          text: 'en <link>every.org</link>',
          link: 'https://every.org',
        },
        header: '¡Tu aporte hace la diferencia!',
        info: '¡Gracias por apoyar la misión de la fundación!',
        custom: {
          placeholder: 'Introduzca la cantidad deseada'
        },
        description: 'Exploramos lugares salvajes de la tierra para documentar los hongos para su conservación, la protección de su hábitat y las formas de vida de las personas que dependen de ellos.',
        button: 'Donar {{amount}}',
        switch: 'O haga una <action>Donación mensual</action>'
      },
      footer: 'La Fundacion Fungi usa Every.org como socio de confianza para procesar las donaciones. Serás redireccionado a Every.org para completar la donación.'
    }
  }
}

export default everyMonthOptions

