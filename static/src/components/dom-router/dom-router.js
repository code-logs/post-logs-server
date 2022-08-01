import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export const navigate = (route) => {
    if (route === window.location.pathname)
        return;
    const navigateEvent = new CustomEvent('navigate', { detail: { route } });
    document.dispatchEvent(navigateEvent);
};
let DomRouter = class DomRouter extends LitElement {
    constructor() {
        super(...arguments);
        this.pages = [];
        this.PAGE_ACTIVE_FLAG = 'active';
        this.loadedPageRoutes = new Set();
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        this.navigateHandler = this.onNavigateHandler.bind(this);
        this.popStateHandler = this.onPopStateHandler.bind(this);
        document.addEventListener('navigate', this.navigateHandler);
        window.addEventListener('popstate', this.popStateHandler);
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        if (this.navigateHandler)
            document.removeEventListener('navigate', this.navigateHandler);
        if (this.popStateHandler)
            window.removeEventListener('popstate', this.popStateHandler);
    }
    firstUpdated() {
        if (!this.pages.length)
            throw new Error('No pages initialized');
    }
    updated(props) {
        if (props.has('pages') && !this.activePage) {
            this.initActivePage();
        }
    }
    render() {
        return html `<slot></slot>`;
    }
    getPageElement(targetPage) {
        const pageElement = this.querySelector(targetPage.tagName);
        if (!pageElement)
            throw new Error('No page element found');
        return pageElement;
    }
    get currentPageElement() {
        return this.querySelector(`[${this.PAGE_ACTIVE_FLAG}]`);
    }
    initActivePage() {
        const targetPage = this.findMatchedPage();
        this.mount(targetPage);
    }
    async mount(targetPage) {
        if (!this.loadedPageRoutes.has(targetPage.route)) {
            await this.importPage(targetPage);
            this.loadedPageRoutes.add(targetPage.route);
        }
        this.appendPage(targetPage);
        const targetPageElement = this.getPageElement(targetPage);
        targetPageElement.setAttribute(this.PAGE_ACTIVE_FLAG, '');
    }
    unmount() {
        const pageElement = this.currentPageElement;
        pageElement === null || pageElement === void 0 ? void 0 : pageElement.removeAttribute(this.PAGE_ACTIVE_FLAG);
        pageElement === null || pageElement === void 0 ? void 0 : pageElement.remove();
    }
    async importPage(targetPage) {
        await import(targetPage.importPath);
    }
    async appendPage(targetPage) {
        const pageElement = document.createElement(targetPage.tagName);
        this.appendChild(pageElement);
    }
    onNavigateHandler(event) {
        if (event instanceof CustomEvent) {
            const { route } = event.detail;
            window.history.pushState(null, '', route);
            this.reloadPage();
        }
    }
    onPopStateHandler() {
        this.reloadPage();
    }
    reloadPage() {
        const page = this.findMatchedPage();
        this.unmount();
        this.mount(page);
    }
    findMatchedPage() {
        const page = this.pages.find(({ route }) => {
            const pageRouteElements = route.split(/\//);
            const pathElements = window.location.pathname.split(/\//);
            return pageRouteElements.every((routeElement, index) => {
                if (routeElement.startsWith(':'))
                    return true;
                return routeElement === pathElements[index];
            });
        });
        if (!page)
            throw new Error('Failed to find matched page');
        return page;
    }
};
DomRouter.styles = css `
    :host {
      display: flex;
      flex-direction: column;
    }
    ::slotted(*) {
      display: none;
    }
    ::slotted([active]) {
      display: initial;
    }
  `;
__decorate([
    property({ type: Array })
], DomRouter.prototype, "pages", void 0);
DomRouter = __decorate([
    customElement('dom-router')
], DomRouter);
export { DomRouter };
//# sourceMappingURL=dom-router.js.map