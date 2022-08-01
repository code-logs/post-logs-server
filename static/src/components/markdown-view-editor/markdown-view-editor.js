import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../markdown-editor/markdown-editor.js';
import '../markdown-preview/markdown-preview.js';
let MarkdownViewEditor = class MarkdownViewEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.enablePreview = false;
        this.content = '';
    }
    render() {
        return html `
      <section>
        <header id="header">
          <label>
            <span>Preview</span>
            <input
              type="checkbox"
              .checked=${Boolean(this.enablePreview)}
              @change=${() => {
            this.enablePreview = !this.enablePreview;
        }}
            />
          </label>
        </header>

        ${this.enablePreview
            ? html `<markdown-preview
              .markdown=${this.content}
            ></markdown-preview>`
            : html `<markdown-editor
              .value=${this.content}
              @valueChange=${(event) => {
                this.content = event.detail.value;
            }}
            ></markdown-editor>`}
      </section>
    `;
    }
};
MarkdownViewEditor.styles = css `
    #header {
      margin-bottom: 10px;
    }
    #header label {
      display: inline-flex;
    }
    #header span {
      font-size: 0.8rem;
      margin: auto 0;
    }
  `;
__decorate([
    property({ type: Boolean })
], MarkdownViewEditor.prototype, "enablePreview", void 0);
__decorate([
    property({ type: String })
], MarkdownViewEditor.prototype, "content", void 0);
MarkdownViewEditor = __decorate([
    customElement('markdown-view-editor')
], MarkdownViewEditor);
export { MarkdownViewEditor };
//# sourceMappingURL=markdown-view-editor.js.map