import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { marked } from 'marked';
import highlightStyle from './highlight-style.js';
let MarkdownPreview = class MarkdownPreview extends LitElement {
    get preview() {
        const preview = this.renderRoot.querySelector('#preview');
        if (!preview)
            throw new Error('Failed to find preview element');
        return preview;
    }
    updated(changedProps) {
        if (changedProps.has('markdown') && this.markdown) {
            this.renderHtml();
            this.highlightCodeBlock();
        }
    }
    async highlightCodeBlock() {
        const blocks = this.preview.querySelectorAll('pre code');
        blocks.forEach((block) => {
            window.hljs.highlightElement(block);
        });
    }
    renderHtml() {
        if (!this.markdown)
            return;
        this.preview.innerHTML = `
      ${marked.parse(this.markdown)}
    `;
    }
    render() {
        return html ` <div id="preview"></div> `;
    }
};
MarkdownPreview.styles = css `
    ${highlightStyle}
    #preview {
      font-family: sans-serif;
      color: var(--theme-font-color);
      font-size: 14px;
      background-color: var(--theme-light-background-color);
      padding: 10px;
      border: 1px dashed var(--theme-red-color);
      height: 700px;
      outline: none;
      tab-size: 2;
      overflow: auto;
      box-sizing: border-box;
    }
    #preview::-webkit-scrollbar {
      cursor: default;
      width: 5px;
    }
    #preview::-webkit-scrollbar-thumb {
      background-color: var(--theme-red-color);
    }
  `;
__decorate([
    property({ type: String })
], MarkdownPreview.prototype, "markdown", void 0);
MarkdownPreview = __decorate([
    customElement('markdown-preview')
], MarkdownPreview);
export { MarkdownPreview };
//# sourceMappingURL=markdown-preview.js.map