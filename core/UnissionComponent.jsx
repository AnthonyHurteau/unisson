export default class UnissonComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  render() {
    this.append(this.template());
  }

  template() {}
}
