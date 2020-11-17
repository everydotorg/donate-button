import { render } from 'preact'
import EveryMonthLoader from './EveryMonthLoader'
import { loadFonts } from './loadFonts'

// <every-month-widget>

class EveryMonthWidget extends HTMLElement {
  mountPoint
  options = {}

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    render(null, this.mountPoint)
  }

  // TEMP while FFungi still uses language attr
  static get observedAttributes() {
    return ['language']
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'language') {
      this.setOptions({ language: newVal })
      this.render()
    }
  }

  setOptions(newOptions) {
    Object.assign(this.options, newOptions)
    this.render()
  }

  show() {
    this.setOptions({ show: true })
  }

  hide() {
    this.setOptions({ show: false })
  }

  mount() {
    this.mountPoint = document.createElement('div')
    this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint)
  }

  render() {
    if (!this.mountPoint) this.mount()
    render(
      <EveryMonthLoader options={this.options} hide={()=>this.hide()} />,
      this.mountPoint
    )

    this.setTogglebuton()
  }

  setTogglebuton() {
    const button = document.querySelector('#every-month-donate')
    if (!button) return

    button.addEventListener('click', ()=>this.show())
  }
}

loadFonts();
window.customElements.define('every-month-widget', EveryMonthWidget)
