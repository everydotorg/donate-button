
import { render } from "preact";
import Root from "./components/every/everyMonthWidget"


class TopMenu extends HTMLElement {
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
  
  reactProps() {
    return { ...this.componentAttributes, ...this.componentProperties };
  }
  
  mountReactApp() {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    }

    render(<Root { ...this.reactProps() } />, this.mountPoint);
  }
}

window.customElements.define('every-month-widget', TopMenu);