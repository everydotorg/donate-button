# Every month widget

## Use
Add this code at the bottom of your page, just before the `</body>`
```js
<script src="https://assets.every.org/every-month/bundle.js"/>
<every-month-widget/>
<script>
   var everyMonthWidget = document.querySelector('every-month-widget');
   everyMonthWidget.options = {
     ...
   };
</script>
```

As a React component

```jsx
const EveryMonth = () => {
  const ref = useRef()
  useEffect(() => {
    if (ref) ref.current.options = {...}
  }, [])

  return (
    <>
      <script
        type="text/javascript"
        src="https://assets.every.org/every-month/bundle.jss"
      ></script>
      <every-month-widget ref={ref} />
    </>
  )
}
```

Add `id="every-month-donate"` to your donate button or link. Remove any other `onClick="..."` or `href="..."`  
e.g.
`<a href="/donate">Donate</a>` -> `<a id="every-month-donate">Donate</a>`

## Preferences

You can pass attributes to the tag or set props via javascript to configure preferences in the widget

`show: true | false`: modify this prop to show or hide the widget. This is done automatically if you provide us a button with the `id="every-month-donate"`

`language`: set a language for the widget. By default we use the language of the user browser. 
__IMPORTANT__: the value of this prop should be a key provided in the options object (See __Configure__ section)

`mode: 'split_panel' | 'single'`: Set type of widget to display

Example: 
```
  <every-month-widget mode="single" language="en"></every-month-widget>
```
  or
 ```js
  <script>
      const component = document.querySelector('every-month-widget')
      component.language = 'es'
      component.mode = 'split_mode'
  </script>
```

## Configure

You have to pass a javascript object to configure what we should display in the widget:

```js
{
  currency: 'USD', // Currency to display
  monthly: {
    levels: [ // Different choices in monthly donation
      { amount: '25', bgColor: '#BCD9DD', img: "https://images.unsplash.com/photo-1454425064867-5ba516caf601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" },
      { amount: '50', bgColor: '#F4BF86', img:  "https://images.unsplash.com/photo-1558241048-9cd68a14f4ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
      { amount: '100', bgColor: '#A0CBFE', img:  "https://images.unsplash.com/photo-1567346325130-4c4167641eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"},
    ],
    allowCustom: true, // Allow enter custom amount in monthly donation
    custom: { bgColor: '#BCD9DD', img: 'https://user-images.githubusercontent.com/36522634/97372531-9b04b180-1892-11eb-9aed-40a8b049d424.jpg'}
  },
  oneTime: {
    levels: [5, 10, 20, 50, 100, 200], // Different choices in one time donation
    allowCustom: true, // Allow enter custom amount in one time donation
    bgColor: '#BCD9DD',
    img: 'https://images.unsplash.com/photo-1543904856-8257e34283d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80'
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
```

You should pass this options previous initialization of the widget. Also you can change them in runtime. Example:
 ```js
    <script>
      const component = document.querySelector('every-month-widget')
      component.options = {
          ...
      }
      component.show = true
  </script>
```


