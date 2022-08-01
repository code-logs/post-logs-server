import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
let AppTitle = class AppTitle extends LitElement {
    render() {
        return html `<h1>${this.title}</h1>`;
    }
};
AppTitle.styles = css `
    h1 {
      font-size: 1.8rem;
      margin: 10px 0;
      font-weight: 600;
      text-align: center;
    }
  `;
AppTitle = __decorate([
    customElement('app-title')
], AppTitle);
export { AppTitle };
//# sourceMappingURL=app-title.js.map