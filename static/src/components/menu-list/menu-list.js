import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate } from '../dom-router/dom-router.js';
let MenuList = class MenuList extends LitElement {
    constructor() {
        super();
        this.menus = [];
        this.activeRoute = null;
        window.addEventListener('popstate', () => {
            this.requestUpdate();
        });
    }
    render() {
        return html `
      <ul>
        ${this.menus
            .filter((menu) => menu.title)
            .map(({ title, route }) => html `
              <li>
                <button
                  ?active=${this.isActiveMenu(route)}
                  @click=${() => {
            this.moveToPage(route);
        }}
                  @keydown=${(event) => {
            if (event.key === 'enter' || event.key === 'space') {
                this.moveToPage(route);
            }
        }}
                >
                  ${title}
                </button>
              </li>
            `)}
      </ul>
    `;
    }
    isActiveMenu(route) {
        return window.location.pathname === route;
    }
    moveToPage(route) {
        navigate(route);
        this.requestUpdate();
    }
};
MenuList.styles = css `
    ul {
      list-style: none;
      padding: 20px 0;
      margin: 0;
      display: flex;
      gap: 20px;
      justify-content: center;
      border-bottom: 1px dashed var(--theme-red-color);
    }
    button {
      border: 0;
      background-color: transparent;
      transition: transform 0.2s ease-in-out 0s;
      color: inherit;
    }
    button:hover,
    button[active] {
      font-weight: 600;
      transform: scale(1.5);
      transition: transform 0.2s ease-in-out 0s;
    }
  `;
__decorate([
    property({ type: Array })
], MenuList.prototype, "menus", void 0);
__decorate([
    property({ type: String })
], MenuList.prototype, "activeRoute", void 0);
MenuList = __decorate([
    customElement('menu-list')
], MenuList);
export { MenuList };
//# sourceMappingURL=menu-list.js.map