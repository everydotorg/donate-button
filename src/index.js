
import { render } from "preact";
import Root from "./components/every/everyMonthWidget"


class EveryMonthWidget extends HTMLElement {
  mountPoint;
  componentAttributes = {};
  componentProperties = {};
  
  connectedCallback() {
    this.mountReactApp();
  }
  
  disconnectedCallback() {
    
    render(null, this.mountPoint);
  }
  
  static get observedAttributes() {
    return ['show', 'options'];
  }
  
  attributeChangedCallback(name, oldVal, newVal) {
    this.componentAttributes[name] = newVal;

    this.mountReactApp();
  }
  
  get options() {
    return this.componentProperties.options;
  }
  
  set options(newValue) {
    this.componentProperties.options = newValue;
    
    this.mountReactApp();
  }

  get show() {
    return this.componentProperties.show;
  }
  
  set show(newValue) {
    this.componentProperties.show = newValue;
    
    this.mountReactApp();
  }
  
  reactProps() {
    return { ...this.componentAttributes, ...this.componentProperties };
  }
  
  mountReactApp() {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');

      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    }
    render(<Root { ...this.reactProps() } hideFn={() => this.show = false}/>, this.mountPoint);

    this.setTogglebuton()
  }

  setTogglebuton() {
    var everyMonthWidget = document.querySelector('every-month-widget');
    if(everyMonthWidget){
      var everyMonthDonate = function(){ everyMonthWidget.setAttribute('show', true); }
      const buttonToTrigger = document.querySelector('#every-month-donate')
      buttonToTrigger.addEventListener('click', everyMonthDonate)
    }
  }
}

window.customElements.define('every-month-widget', EveryMonthWidget);

