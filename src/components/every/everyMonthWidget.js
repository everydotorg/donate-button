import { useEffect, useState }  from 'preact/hooks'
import WIDGET_MODE from './constants/widgetMode'
// import ReactDOM from 'react-dom'

// No css can be included in this file, they must
// be imported after attachShadow is called.

// will be populated with methods for the host site to call
const everyMonthOptions = {
  mode: WIDGET_MODE.SPLIT_PANEL,
  currency: 'USD',
  language: 'en', // should be one of the defined keys inside i18n
  monthly: {
    levels: [
      { amount: '25', bgColor: '#BCD9DD', img: "https://images.unsplash.com/photo-1454425064867-5ba516caf601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" },
      { amount: '50', bgColor: '#F4BF86', img:  "https://images.unsplash.com/photo-1558241048-9cd68a14f4ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
      { amount: '100', bgColor: '#A0CBFE', img:  "https://images.unsplash.com/photo-1567346325130-4c4167641eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
    ],
    allowCustom: true,
    custom: { bgColor: '#BCD9DD', img: 'https://user-images.githubusercontent.com/36522634/97372531-9b04b180-1892-11eb-9aed-40a8b049d424.jpg'}
  },
  oneTime: {
    levels: [5, 10, 20, 50, 100, 200],
    allowCustom: true,
    bgColor: '#BCD9DD',
    img: 'https://images.unsplash.com/photo-1543904856-8257e34283d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80'
  },
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
    en: {
      company: {
        logo: '',
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
        logo: '',
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

export const Root = (props) => {
  const [EveryMonth, widgetLoaded] = useState()

  // when show is set to true and EveryMonth is not loaded, load it
  useEffect(() => {
    if (props.show && !EveryMonth)
      import('./EveryMonth').then(m => widgetLoaded(() => m.default))
  }, [props.show, EveryMonth])

  if (props.show && !EveryMonth) return 'Loading...' // TODO - nicer loader

  if (!props.show || !EveryMonth) return null

  return <EveryMonth options={props.options || everyMonthOptions} hideFn={props.hideFn} hide={!props.show} />
}

export default Root

