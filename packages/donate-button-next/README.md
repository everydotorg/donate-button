# Every.org Donate Button

For nonprofits — the simplest way to give your supporters a beautiful donation experience. This button opens a donation flow through [Every.org](https://www.every.org/nonprofits).

See some demoes at https://embeds.every.org/0.3. And see this in production helping raise funds at https://www.goodjobbub.org/

## Use

Here is an example html file with a donate button for https://www.every.org/lilbubsbigfund. You can copy
paste this code and and then replace lilbubsbigfund with the correct handle.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="every-donate-btn">
      <a href="https://www.every.org/lilbubsbigfund/donate">Donate</a>
    </div>
    <script
      async
      defer
      src="https://assets.every.org/dist/donate-button/0.3/index.js"
      class="every-donate-btn-js"
    ></script>
    <script>
      function createWidget() {
        const COLOR = "#00a380";
        everyDotOrgDonateButton.createButton({
          selector: "#every-donate-btn",
          bgColor: COLOR,
        });
        everyDotOrgDonateButton.createWidget({
          selector: "#every-donate-btn",
          options: {
            nonprofitSlug: "lilbubsbigfund",
            primaryColor: COLOR,
            showInitialMessage: false,
            defaultFrequency: "once",
            infoPages: [
              {
                key: "faq",
                name: "FAQ",
                source: `## How does this donate button work?
        This button is powered by Every.org, a tax-exempt US 501(c)(3) nonprofit building accessible giving infrastructure to help every person and organization do more good.
              `,
              },
            ],
            currencies: [
              {
                countryCodes: ["US"],
                name: "USD",
                symbol: "$",
                minimumAmount: 10,
              },
            ],
          },
        });
      }
      if (window.everyDotOrgDonateButton) {
        createWidget();
      } else {
        document.querySelector(".every-donate-btn-js").onload = createWidget;
      }
    </script>
  </body>
</html>
```

## Configure

### Minimum Configuration

You have to pass a javascript object to configure what we should display in the
widget. The minimum that you need to include is the slug for your nonprofit on
Every.org.

For instance:

```js
{
  onSubmit: {
    charity: "ourworldindata";
  }
}
```

This configuration will make a generic donate button that sends users to
`ourworldindata`.

### Configuration options

```js
{
  // Configure action when the user submit the donation in the widget.
  // You can pass to us the following parameters to customize it or listen to the callback
  onSubmit: {
    charity: 'your-foundation', // Your Every.org URL slug
    params: {
      share_info: 1, // Share info with nonprofit checked by default
      no_exit: 1, // Disallow exiting from donation flow to Every.org
    }
  },
  /**
   * If true, when the user continues to Every.org to complete their donation,
   * Every.org will open in a new tab
   */
  completeDonationInNewTab: false,
  defaultMode: 'monthly' // Available values: 'monthly', 'one-time'. Default monthly
  currency: 'USD', // Currency to display
  monthly: {
    levels: [ // Different choices in monthly donation
      { amount: '25', bgColor: '#BCD9DD', img: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80" },
      { amount: '50', bgColor: '#F4BF86', img: "https://images.unsplash.com/photo-1579890002580-841359ca1aab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80", default: true },
      { amount: '100', bgColor: '#A0CBFE', img: "https://images.unsplash.com/photo-1598846019232-a5752b94c3af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80" },
      { amount: 'custom', bgColor: '#BCD9DD', img: 'https://images.unsplash.com/photo-1602199926649-2e5e447bab97?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80' }
    ],
  },
  oneTime: {
    levels: [10, 20, 30, 50, 100, 200], // Different choices in one time donation
    allowCustom: true, // Allow enter custom amount in one time donation
    bgColor: '#BCD9DD',
    img: 'https://images.unsplash.com/photo-1602199926649-2e5e447bab97?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
  },
  // Both ways supported
  // onSubmit: ({amount, frequency}) => { console.log(amount, frequency)},
  i18n: {
    // Different languages of the widget.
    // The keys used here (en, es) are the keys used to change the language via Attrs or Javascript.
    // By default we use the key "en".
    en: {
      company: {
        logo: 'https://i.ibb.co/VDKGT2r/logo-dummy.png',
        name: 'Coral\'s Guardians',
        location: 'San Andrés, Colombia',
      },
      monthly: {
        logo: {
          header: 'Monthly donation',
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        header: 'This is a headline, which could be two lines long.',
        info: 'Monthly gifts help nonprofits focus on their mission and long-term impact',
        levels: [
          {
            amount: '25',
            name: 'Sponge Supporter',
            // You can bold a part of this prop text wrapping it between <bold> tags
            description1: 'As a <bold>Sponge Supporter</bold>, you will be helping us with this and that and this and that and this.',
            description2: 'We deliver groundbreaking projects, innovative research and inspiring educational content to engage the public, support science and accelerate actions vital to the preservation of coral reefs.'
          },
          {
            amount: '50',
            name: 'Friend of the reef',
            description1: 'As a <bold>Friend of the reef</bold> you will be helping us with this and that and this and that and this.',
            description2: 'We deliver groundbreaking projects, innovative research and inspiring educational content to engage the public, support science and accelerate actions vital to the preservation of coral reefs.'
          },
          {
            amount: '100',
            name: 'Coral Champion',
            description1: 'As a <bold>Coral Champion</bold> you will help us develop the first dynamic map of known ancestral uses of fungi.',
            description2: 'We deliver groundbreaking projects, innovative research and inspiring educational content to engage the public, support science and accelerate actions vital to the preservation of coral reefs.'
          },
        ],
        custom: {
          label: 'Custom',
          placeholder: 'Enter amount',
          description1: "With your support we will promote do things like this and that",
          description2: 'We deliver groundbreaking projects, innovative research and inspiring educational content to engage the public, support science and accelerate actions vital to the preservation of coral reefs..'
        },
        // The widget will automatically replace the {{amount}} on the button text with the current amount selected by the user.
        button: 'Donate {{amount}} every month',
        // The widget will automatically highlight and use the text between <action> tags to change between modes
        switch: 'Or make a <action>One Time Donation</action>'
      },
      oneTime: {
        logo: {
          header: 'One time donation',
          // The widget will automatically highlight the text between <link> tags and create a link to the website indicated on `link` prop
          text: 'on <link>every.org</link>',
          link: 'https://every.org',
        },
        name: 'One time donation',
        header: 'This is another headline, which could be two lines long.',
        info: 'Thank you for supporting the mission of the foundation!',
        custom: {
          placeholder: 'Enter custom amount'
        },
        description: 'We deliver groundbreaking projects, innovative research and inspiring educational content to engage the public, support science and accelerate actions vital to the preservation of coral reefs.',
        button: 'Donate {{amount}}',
        switch: 'Or make a <action>Monthly donation</action>'
      },
      footer: 'You will be redirected to a secure page on Every.org to complete your donation.'
    },
    es: {
      company: {
        logo: 'https://i.ibb.co/VDKGT2r/logo-dummy.png',
        name: 'Guardianes del coral',
        location: 'San Andrés, Colombia',
      },
      monthly: {
        logo: {
          header: 'Donación mensual',
          text: 'en <link>every.org</link>',
          link: 'https://every.org',
        },
        header: 'Este es un headline, que puede tener dos lineas.',
        info: 'Las ayudas mensuales ayudan a las fundaciones a enfocarse en su misión y generar impacto a largo plazo',
        levels: [
          {
            amount: '25',
            name: 'Soporte Esponjoso',
            description1: 'Como <bold>Soporte Esponjoso</bold>, nos ayudaras a nosotros a lograr estas cosas y ademas estas otras',
            description2: 'Llevamos a cabo proyectos revolucionarios, investigación innovadora y contenido educativo inspirador para involucrar al público, apoyar la ciencia y acelerar las acciones vitales para la preservación de los arrecifes de coral.'
          },
          {
            amount: '50',
            name: 'Amigo del Arrecife',
            description1: 'Como <bold>Amigo del Arrecife</bold>, nos ayudaras a nosotros a lograr estas cosas y ademas estas otras',
            description2: 'Llevamos a cabo proyectos revolucionarios, investigación innovadora y contenido educativo inspirador para involucrar al público, apoyar la ciencia y acelerar las acciones vitales para la preservación de los arrecifes de coral.'
          },
          {
            amount: '100',
            name: 'Campeón del Coral',
            description1: 'Como <bold>Campeón del Coral</bold>, nos ayudaras a nosotros a lograr estas cosas y ademas estas otras',
            description2: 'Llevamos a cabo proyectos revolucionarios, investigación innovadora y contenido educativo inspirador para involucrar al público, apoyar la ciencia y acelerar las acciones vitales para la preservación de los arrecifes de coral.'
          },
        ],
        custom: {
          label: 'Personalizado',
          placeholder: 'Ingrese el monto',
          description1: 'Con tu aporte cuidaremos los arrecifes de coral del caribe',
          description2: 'Llevamos a cabo proyectos revolucionarios, investigación innovadora y contenido educativo inspirador para involucrar al público, apoyar la ciencia y acelerar las acciones vitales para la preservación de los arrecifes de coral.'
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
        description: 'Llevamos a cabo proyectos revolucionarios, investigación innovadora y contenido educativo inspirador para involucrar al público, apoyar la ciencia y acelerar las acciones vitales para la preservación de los arrecifes de coral.',
        button: 'Donar {{amount}}',
        switch: 'O haga una <action>Donación mensual</action>'
      },
      footer: 'Serás redireccionado a Every.org para completar la donación.'
    }
  }
}
```

You should pass this options previous initialization of the widget. Also you can change them in runtime. Example:

```js
<script>
  // Ensure that the script was fully loaded before do this
  everyMonthWidget.setOptions({
      ...
  })
  everyMonthWidget.show()
</script>
```

## Styled button

If you don't want to create a button in your site, style it and link to the widget you can use our styled button that it's fully customizable.
We are linking the button to the widget automatically!

![alt generic donate button](docs/assets/generic-button.png)

### Minimum configuration

```js
<script>everyMonthWidget.createButton('#yourElementToAttachTheButton')</script>
```

### Customize the button

The button accepts an object with the following properties to configure the styles:

```ts
  {
    // Button text
    label?: string;
    // Css classes to add to the button
    classes: string | string[];
    // Show the every icon inside the button
    withIcon: boolean;
    // Useful styling props
    bgColor?: string;
    textColor?: string;
    borderRadius?: string;
    fontSize?: string;
    padding?: string;
  }
```

### Extra configuration

You can configure that instance of the widget with the props that you need:

```js
<script>
  everyMonthWidget.createButton('#yourElementToAttachTheButton',
  buttonStylesProps, widgetInstanceProps)
</script>
```

## API

We expose three functions through the global `everyMonthWidget` object:

- setOptions({...options}): Function to set/override the configuration of the widget.
- showOnClick(selector, specificOptions?): Function to link a selector with the widget. As optional you can pass extra options that would be set only when the user open the widget with that button.
- show(): Open the widget with javascript code.
- createButton(selector, buttonOptions, widgetOptions): Function to generate a styled and customizable button inside the selector.

## Demo site hosting details

- Vercel hosts `embeds.every.org` as a static site from
  `docs/dist/donate-button/` - the root URL is the `index.html` page in that
  folder (which was written by hand, not generated)
- Github Pages hosts `assets.every.org` as a static site from the `docs/`
  folder; Github Pages hosts our embeddable JS bundle from there.
