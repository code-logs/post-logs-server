import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { apis } from '../../apis/index.js';
import { h2Style, sectionStyle } from '../styles/styles.js';
let TagSelector = class TagSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.tags = [];
        this.chosenTags = [];
        this.newTags = [];
    }
    get tagSelectorInputs() {
        return Array.from(this.renderRoot.querySelectorAll('#exists-tags input[type=checkbox]'));
    }
    newTagChangeHandler(event) {
        const newTagInput = event.currentTarget;
        const tags = Array.from(new Set(newTagInput.value
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag)));
        const { newTags, existsTags } = tags.reduce((acc, tag) => {
            const existsTag = this.tags.find(({ name }) => name === tag);
            if (existsTag) {
                acc.existsTags.push(existsTag);
            }
            else {
                acc.newTags.push({ name: tag });
            }
            return acc;
        }, { newTags: [], existsTags: [] });
        this.newTags = newTags;
        newTagInput.value = newTags.map(({ name }) => name).join(', ');
        if (existsTags.length && this.tagSelectorInputs.length) {
            const existsTagNames = existsTags.map(({ name }) => name);
            this.tagSelectorInputs
                .filter((input) => existsTagNames.indexOf(input.value) >= 0)
                .forEach((input) => {
                input.setAttribute('checked', '');
            });
        }
    }
    firstUpdated() {
        this.fetchTags();
    }
    async fetchTags() {
        this.tags = await apis.getTags();
    }
    get selectedTags() {
        const existsTags = Array.from(this.renderRoot.querySelectorAll('input[type=checkbox].exists-tag'))
            .filter(({ checked }) => checked)
            .map(({ id, value }) => ({ id, name: value }));
        const newTags = Array.from(this.renderRoot.querySelectorAll('input[type=checkbox].new-tag'))
            .filter(({ checked }) => checked)
            .map(({ value }) => ({ name: value }));
        return [...existsTags, ...newTags];
    }
    render() {
        return html `
      <section id="tag-selector" class="container">
        <header>
          <h2>Tags</h2>
        </header>

        <label id="new-tag-input-label">
          <input
            id="new-tag-input"
            @change=${this.newTagChangeHandler}
            placeholder="Type tags here as csv format."
          />
        </label>

        ${this.newTags.length
            ? html `
              <div id="new-tags">
                ${this.newTags.map((tag) => html `<label>
                    <input
                      class="new-tag"
                      type="checkbox"
                      checked
                      .value=${tag.name}
                      disabled
                    />
                    <span>${tag.name}</span>
                  </label>`)}
              </div>
            `
            : ''}

        <div id="exists-tags">
          ${this.tags.map((tag) => html ` <label>
              <input
                class="exists-tag"
                type="checkbox"
                ?checked=${this.chosenTags.findIndex(({ name }) => name === tag.name) >= 0}
                id=${tag.id}
                .value=${tag.name}
              />
              <span>${tag.name}</span>
            </label>`)}
        </div>
      </section>
    `;
    }
};
TagSelector.styles = css `
    ${sectionStyle}
    ${h2Style}
    #tag-selector > label > input {
      box-sizing: border-box;
      border: 1px dashed var(--theme-red-color);
      outline: none;
      background-color: transparent;
      max-width: 180px;
      height: 30px;
      margin: auto 0 5px 0;
      padding: 0 5px;
    }
    #tag-selector > div {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
    #tag-selector #new-tags {
      border-bottom: 1px dashed var(--theme-red-color);
      padding: 0 0 5px;
      margin: 5px 0;
    }
    #tag-selector #new-tag-input-label {
      display: flex;
    }
    #tag-selector #new-tag-input {
      max-width: none;
      flex: 1;
    }
    #tag-selector label {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 5px;
      overflow: hidden;
      white-space: nowrap;
    }
    #tag-selector label > span {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `;
__decorate([
    property({ type: Array })
], TagSelector.prototype, "tags", void 0);
__decorate([
    property({ type: Array })
], TagSelector.prototype, "chosenTags", void 0);
__decorate([
    property({ type: Array })
], TagSelector.prototype, "newTags", void 0);
TagSelector = __decorate([
    customElement('tag-selector')
], TagSelector);
export { TagSelector };
//# sourceMappingURL=tag-selector.js.map