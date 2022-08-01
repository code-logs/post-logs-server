import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ModalSpinner = class ModalSpinner extends LitElement {
    constructor() {
        super(...arguments);
        this.isLoading = false;
        this.loadingStartHandler = () => {
            document.body.style.overflow = 'hidden';
            this.isLoading = true;
            this.modal.style.opacity = '1';
        };
        this.loadingStopHandler = () => {
            document.body.style.overflow = 'auto';
            this.isLoading = false;
            this.modal.style.opacity = '0';
        };
    }
    get modal() {
        const modal = this.renderRoot.querySelector('#modal');
        if (!modal)
            throw new Error('Failed to find modal');
        return modal;
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        window.addEventListener('loadingStart', this.loadingStartHandler);
        window.addEventListener('loadingStop', this.loadingStopHandler);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        window.removeEventListener('loadingStart', this.loadingStartHandler);
        window.removeEventListener('loadingStop', this.loadingStopHandler);
    }
    render() {
        return html `<section id="modal" class=${this.isLoading ? 'is-loading' : ''}>
      <p id="message">Now Loading...</p>
    </section>`;
    }
};
ModalSpinner.styles = css `
    #modal {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      transition: opacity 0.3s ease-in-out 0s;
      pointer-events: none;
      opacity: 0;
    }
    #modal.is-loading {
      transition: opacity 0.5s ease-in-out 0s;
      pointer-events: auto;
      opacity: 1;
    }
    #message {
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%);
      font-weight: 700;
      font-size: 1.2rem;
      text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
        1px 1px 0 #fff;
    }
  `;
__decorate([
    property({ type: Boolean })
], ModalSpinner.prototype, "isLoading", void 0);
ModalSpinner = __decorate([
    customElement('modal-spinner')
], ModalSpinner);
export { ModalSpinner };
//# sourceMappingURL=modal-spinner.js.map