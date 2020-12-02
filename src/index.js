import { render as prRender } from 'preact'
import { loadFonts } from './loadFonts'
import EveryMonthLoader from './EveryMonthLoader'

let defaultOptions = {
  currency: 'USD'
}
let baseOptions = {}
let instanceOptions = {}

let mountPoint

const setOptions = (newOptions) => {
  Object.assign(baseOptions, newOptions)
  render()
}

const show = () => {
  setOptions({ show: true })
}

const hide = () => {
  setOptions({ show: false })
}

const mount = () => {
  // We don't attach directly to body because is hiding the elements inside the body for some reason.
  const shadowRoot = document.createElement('div')
  document.body.appendChild(shadowRoot)

  mountPoint = document.createElement('div')
  shadowRoot.attachShadow({ mode: 'open' }).appendChild(mountPoint)
}

const render = () => {
  if (!mountPoint) mount()
  const options = {
    ...defaultOptions,
    ...baseOptions,
    ...instanceOptions
  }
  prRender(
    <EveryMonthLoader options={options} hide={() => hide()} />,
    mountPoint
  )
}

const setToggleButton = (selector, options) => {
  const button = document.querySelector(selector)
  if (!button) return

  button.addEventListener('click', () => {
    instanceOptions = { ...options }
    show()
  })
}

loadFonts();
window['everyMonthWidget'] = {
  setOptions,
  show,
  showOnClick: setToggleButton
}
