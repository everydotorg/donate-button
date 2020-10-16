import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// No css can be included in this file, they must
// be imported after attachShadow is called.

// will be populated with methods for the host site to call
const everyMonthInterface = {}

const Root = () => {
  const [EveryMonth, widgetLoaded] = useState()
  const [options, setOptions] = useState({ show: false })

  // popualte everyMonthInterface
  everyMonthInterface.init = setOptions
  everyMonthInterface.show = () => setOptions({ ...options, show: true })
  everyMonthInterface.hide = () => setOptions({ ...options, show: false })

  // when show is set to true and EveryMonth is not loaded, load it
  useEffect(() => {
    if (options.show && !EveryMonth)
      import('./EveryMonth').then(m => widgetLoaded(() => m.default))
  }, [options.show, EveryMonth])

  if (options.show && !EveryMonth) return 'Loading...' // TODO - nicer loader

  if (!options.show || !EveryMonth) return null

  return <EveryMonth options={options} hide={everyMonthInterface.hide} />
}

  //Add fonts
  const link = document.createElement('link');

  link.type ="text/css";
  link.rel ="stylesheet";
  link.href="//db.onlinewebfonts.com/c/3ddd0e3d1a076e112b27d8d9b7e20200?family=Basis+Grotesque+Pro"
  
  document.head.appendChild(link);

// Create Shadow DOM
const element = document.getElementById('every-month-widget')
const shadowRoot = element.attachShadow({ mode: 'open' })

// Create a root to render React elements into
const rootDiv = document.createElement('div')
shadowRoot.appendChild(rootDiv)

// Render
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  rootDiv
)

export default everyMonthInterface

