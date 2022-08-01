import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './components/app-title/app-title.js';
import './components/menu-list/menu-list.js';
import './components/modal-spinner/modal-spinner.js';
import { pages } from './constants/pages.js';
let PostLogs = class PostLogs extends LitElement {
    render() {
        return html `
      <modal-spinner></modal-spinner>

      <header>
        <app-title title="Post Logs"></app-title>
        <nav>
          <menu-list .menus=${pages}></menu-list>
        </nav>
      </header>
      <main>
        <dom-router .pages=${pages}></dom-router>
      </main>
    `;
    }
};
PostLogs.styles = css `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      position: sticky;
      top: 0;
      background-color: var(--theme-background-color);
    }

    main {
      flex-grow: 1;
      width: 800px;
      max-width: 800px;
      margin: 20px auto 0 auto;
      padding-bottom: 10px;
    }
  `;
__decorate([
    property({ type: Object })
], PostLogs.prototype, "activePage", void 0);
PostLogs = __decorate([
    customElement('post-logs')
], PostLogs);
export { PostLogs };
//# sourceMappingURL=post-logs.js.map