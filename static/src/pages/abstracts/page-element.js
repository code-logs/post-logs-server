import { __decorate } from "tslib";
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
export class PageElement extends LitElement {
    constructor() {
        super(...arguments);
        this.active = false;
    }
    beforeActive() {
        return true;
    }
    beforeInactive() {
        return true;
    }
    shouldUpdate(changedProps) {
        super.shouldUpdate(changedProps);
        if (changedProps.has('active')) {
            if (this.active) {
                return this.beforeActive();
            }
            return this.beforeInactive();
        }
        return true;
    }
    updated(props) {
        if (props.has('active') && this.active) {
            document.title = this.pageTitle;
        }
    }
}
__decorate([
    property({ type: String })
], PageElement.prototype, "pageTitle", void 0);
__decorate([
    property({ type: Boolean })
], PageElement.prototype, "active", void 0);
//# sourceMappingURL=page-element.js.map