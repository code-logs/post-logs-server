import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { marked } from 'marked';
import { buttonBoxStyle, h2Style, h3Style, sectionStyle, } from '../styles/styles.js';
let ReferenceSelector = class ReferenceSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.references = [];
        this.newReferences = [];
    }
    get newRefForm() {
        const newRefForm = this.renderRoot.querySelector('#new-reference-form');
        if (!newRefForm)
            throw new Error('Failed to find target from');
        return newRefForm;
    }
    get newRefTitleInput() {
        const input = this.renderRoot.querySelector('#reference-title-input');
        if (!input)
            throw new Error('Failed to find target input');
        return input;
    }
    get newRefUrlInput() {
        const input = this.renderRoot.querySelector('#reference-url-input');
        if (!input)
            throw new Error('Failed to find target input');
        return input;
    }
    get selectedRefs() {
        const refCheckboxes = Array.from(this.renderRoot.querySelectorAll('#reference-selector input'));
        const selectedCheckboxes = refCheckboxes.filter((input) => input.checked);
        return selectedCheckboxes.map((checkbox) => {
            const { title, url } = checkbox.dataset;
            return { title, url };
        });
    }
    computeReferenceCandidates(content) {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = marked.parse(content);
        const anchorTags = tempContainer.querySelectorAll('a');
        if (!anchorTags.length) {
            tempContainer.remove();
            return [];
        }
        const tempRefCandidates = [];
        anchorTags.forEach((anchorTag) => {
            const { href, innerText } = anchorTag;
            if (!(href === null || href === void 0 ? void 0 : href.startsWith(window.location.origin))) {
                tempRefCandidates.push({ title: innerText || href, url: href });
            }
        });
        tempContainer.remove();
        return tempRefCandidates;
    }
    addNewReference(event) {
        event.preventDefault();
        const newRefURLs = this.newReferences.map(({ url }) => url);
        const title = this.newRefTitleInput.value;
        const url = this.newRefUrlInput.value;
        if (newRefURLs.indexOf(url) >= 0) {
            alert('동일한 참조항목이 존재 합니다.');
            return;
        }
        this.newReferences = [...this.newReferences, { title, url }];
        this.newRefForm.reset();
        this.newRefTitleInput.focus();
    }
    render() {
        let contentRefCandidates = [];
        if (this.content) {
            contentRefCandidates = this.computeReferenceCandidates(this.content);
        }
        return html `<section id="reference-selector" class="container">
      <header>
        <h2>References</h2>
      </header>

      ${this.references.length
            ? html `<section>
            <h3>Registered References</h3>
            <ul>
              ${this.references.map((ref) => html `<li>
                  <label>
                    <input
                      type="checkbox"
                      .defaultChecked=${true}
                      data-title=${ref.title}
                      data-url=${ref.url}
                    />
                    <div class="input-container">
                      <input .value=${ref.title} />
                      <a href="${ref.url}" target="_blank">${ref.url}</a>
                    </div>
                  </label>
                </li>`)}
            </ul>
          </section>`
            : ''}
      ${contentRefCandidates.length
            ? html `<section>
            <h3>Content References</h3>
            <ul>
              ${contentRefCandidates.map((ref) => html `<li>
                  <label>
                    <input
                      type="checkbox"
                      data-title=${ref.title}
                      data-url=${ref.url}
                    />
                    <div class="input-container">
                      <input .value=${ref.title} />
                      <a href="${ref.url}" target="_blank">${ref.url}</a>
                    </div>
                  </label>
                </li>`)}
            </ul>
          </section>`
            : ''}

      <section id="custom-ref-container">
        <h3>Custom References</h3>
        <form id="new-reference-form" @submit=${this.addNewReference}>
          <input id="reference-title-input" required placeholder="이름" />
          <input
            id="reference-url-input"
            required
            type="url"
            placeholder="URL"
          />
          <button>+</button>
        </form>

        <ul>
          ${this.newReferences.map((ref) => html `<li>
              <label>
                <input
                  type="checkbox"
                  .defaultChecked=${true}
                  data-title=${ref.title}
                  data-url=${ref.url}
                />
                <div class="input-container">
                  <input .value=${ref.title} />
                  <a href="${ref.url}" target="_blank">${ref.url}</a>
                </div>
              </label>
            </li>`)}
        </ul>
      </section>
    </section>`;
    }
};
ReferenceSelector.styles = css `
    ${sectionStyle}
    ${h2Style}
    ${h3Style}
    ${buttonBoxStyle}
    #reference-selector ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    #reference-selector li label {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 5px;
    }
    #reference-selector input {
      box-sizing: border-box;
      border: 1px dashed var(--theme-red-color);
      outline: none;
      background-color: transparent;
      max-width: 180px;
      height: 30px;
      margin: auto 0;
      padding: 0 5px;
    }
    #reference-selector #new-reference-form {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      margin-bottom: 10px;
      gap: 10px;
    }
    #reference-selector #new-reference-form input {
      max-width: inherit;
    }
    #reference-selector #new-reference-form button {
      height: 30px;
      min-width: initial;
      padding: 0 10px;
    }
    #reference-selector .input-container {
      display: flex;
      gap: 10px;
    }
    #reference-selector .input-container a {
      margin: auto 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 160px;
    }
  `;
__decorate([
    property({ type: String })
], ReferenceSelector.prototype, "content", void 0);
__decorate([
    property({ type: Array })
], ReferenceSelector.prototype, "references", void 0);
__decorate([
    property({ type: Array })
], ReferenceSelector.prototype, "newReferences", void 0);
ReferenceSelector = __decorate([
    customElement('reference-selector')
], ReferenceSelector);
export { ReferenceSelector };
//# sourceMappingURL=reference-selector.js.map