import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { apis } from '../../apis/index.js';
import { toLocalizedDateInputValue } from '../../utils/date-util.js';
import { h2Style, inputStyle, sectionStyle } from '../styles/styles.js';
// eslint-disable-next-line import/no-duplicates
import '../reference-selector/reference-selector.js';
// eslint-disable-next-line import/no-duplicates
import '../tag-selector/tag-selector.js';
import { BASE_URL } from '../../constants/base-url.js';
let PostInfo = class PostInfo extends LitElement {
    constructor() {
        super(...arguments);
        this.categories = [];
        this.posts = [];
        this.createMode = false;
    }
    get thumbnailInput() {
        const input = this.renderRoot.querySelector('#thumbnail-input');
        if (!input)
            throw new Error('Failed to find input');
        return input;
    }
    get tagSelector() {
        const tagSelector = this.renderRoot.querySelector('tag-selector');
        if (!tagSelector)
            throw new Error('Failed to find tag selector');
        return tagSelector;
    }
    get refSelector() {
        const refSelector = this.renderRoot.querySelector('reference-selector');
        if (!refSelector)
            throw new Error('Failed to find reference selector');
        return refSelector;
    }
    firstUpdated() {
        this.fetchPosts();
        this.fetchCategories();
    }
    async fetchCategories() {
        this.categories = await apis.getCategories();
    }
    async fetchPosts() {
        this.posts = await apis.getPosts();
    }
    get form() {
        const form = this.renderRoot.querySelector('form');
        if (!form)
            throw new Error('Failed to find form element');
        return form;
    }
    serialize() {
        var _a, _b, _c;
        const { title, description, category, publishedAt, published = false, nextPostTitle, prevPostTitle, } = Object.fromEntries(new FormData(this.form));
        if (!title)
            throw new Error('포스팅의 제목을 입력해 주세요.');
        if (!category)
            throw new Error('포스팅의 카테고리를 선택해 주세요.');
        if (!this.createMode && !publishedAt)
            throw new Error('포스팅 작성일을 선택해 주세요.');
        if (!description)
            throw new Error('포스팅의 설명을 입력해 주세요.');
        if (!((_a = this.thumbnailInput.files) === null || _a === void 0 ? void 0 : _a.length) && !((_b = this.post) === null || _b === void 0 ? void 0 : _b.thumbnailName))
            throw new Error('포스팅 썸네일 이미지를 선택해 주세요.');
        const tags = this.tagSelector.selectedTags;
        if (!tags.length)
            throw new Error('포스팅의 태그를 선택해 주세요.');
        const references = this.refSelector.selectedRefs;
        const tempPost = {
            title,
            category,
            publishedAt,
            published: Boolean(published),
            description,
            fileName: `${category.toLowerCase()}-${title.toLowerCase()}.md`.replace(/ +/g, '-'),
            tags,
            references,
        };
        if (prevPostTitle)
            tempPost.series = { prevPostTitle };
        if (nextPostTitle)
            tempPost.series = { ...tempPost.series, nextPostTitle };
        const result = {
            tempPost,
        };
        if ((_c = this.thumbnailInput.files) === null || _c === void 0 ? void 0 : _c[0]) {
            const [thumbnail] = this.thumbnailInput.files;
            result.thumbnail = thumbnail;
        }
        return result;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return html `
      <section class="container">
        <h2>Info</h2>
        <form>
          <label>
            <span>제목</span>
            <input name="title" .value=${((_a = this.post) === null || _a === void 0 ? void 0 : _a.title) || ''} />
          </label>

          <label>
            <span>카테고리</span>
            <input
              list="category"
              name="category"
              .value=${((_b = this.post) === null || _b === void 0 ? void 0 : _b.category) || ''}
            />
            <datalist id="category">
              ${this.categories.map((category) => html `<option>${category}</option>`)}
            </datalist>
          </label>

          <label>
            <span>작성일</span>
            <input
              name="publishedAt"
              type="date"
              .value=${((_c = this.post) === null || _c === void 0 ? void 0 : _c.publishedAt) ||
            toLocalizedDateInputValue(Date.now())}
            />
          </label>

          <label>
            <span>배포여부</span>
            <input
              name="published"
              type="checkbox"
              ?checked=${((_d = this.post) === null || _d === void 0 ? void 0 : _d.published) || false}
            />
          </label>

          <label>
            <span>이전글</span>
            <select name="prevPostTitle">
              <option></option>
              ${this.posts.map((post) => {
            var _a, _b;
            return html `<option
                    ?selected=${((_b = (_a = this.post) === null || _a === void 0 ? void 0 : _a.series) === null || _b === void 0 ? void 0 : _b.prevPostTitle) === post.title}
                  >
                    ${post.title}
                  </option>`;
        })}
            </select>
          </label>

          <label>
            <span>다음글</span>
            <select name="nextPostTitle">
              <option></option>
              ${this.posts.map((post) => {
            var _a, _b;
            return html `<option
                    ?selected=${((_b = (_a = this.post) === null || _a === void 0 ? void 0 : _a.series) === null || _b === void 0 ? void 0 : _b.nextPostTitle) === post.title}
                  >
                    ${post.title}
                  </option>`;
        })}
            </select>
          </label>

          <label class="description">
            <span>설명</span>
            <input name="description" .value=${((_e = this.post) === null || _e === void 0 ? void 0 : _e.description) || ''} />
          </label>
        </form>
      </section>

      <section id="thumbnail-selector" class="container">
        <h2>Thumbnail</h2>
        <input
          id="thumbnail-input"
          name="thumbnailName"
          type="file"
          accept="image/png"
          @input=${(event) => {
            var _a;
            const fileInput = event.currentTarget;
            if ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]) {
                this.thumbnailObjURL = window.URL.createObjectURL(fileInput.files[0]);
            }
            else {
                this.thumbnailObjURL = undefined;
            }
        }}
        />

        ${((_f = this.post) === null || _f === void 0 ? void 0 : _f.thumbnailName) || this.thumbnailObjURL
            ? html `<img
              class="thumbnail-preview"
              src=${this.thumbnailObjURL
                ? this.thumbnailObjURL
                : `${BASE_URL}/${(_g = this.post) === null || _g === void 0 ? void 0 : _g.thumbnailName}`}
              alt=${((_h = this.post) === null || _h === void 0 ? void 0 : _h.thumbnailName) || 'Thumbnail preview'}
            />`
            : ''}
      </section>

      <tag-selector .chosenTags=${((_j = this.post) === null || _j === void 0 ? void 0 : _j.tags) || []}></tag-selector>

      <reference-selector
        .references=${((_k = this.post) === null || _k === void 0 ? void 0 : _k.references) || []}
        .content=${this.content}
      ></reference-selector>
    `;
    }
};
PostInfo.styles = css `
    ${sectionStyle}
    ${h2Style}
    ${inputStyle}
    :host {
      font-family: sans-serif;
      color: var(--theme-font-color);
      font-size: 0.8rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    form {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    form > label {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 5px;
    }
    form > label.description {
      grid-column: 1 / 5;
    }
    form > label.description > input {
      max-width: inherit;
    }
    #thumbnail-selector {
      display: grid;
    }
    #thumbnail-selector img {
      margin: 10px auto;
    }
    #thumbnail-selector .thumbnail-preview {
      max-height: 300px;
      max-width: 100%;
    }
  `;
__decorate([
    property({ type: Object })
], PostInfo.prototype, "post", void 0);
__decorate([
    property({ type: String })
], PostInfo.prototype, "content", void 0);
__decorate([
    property({ type: Array })
], PostInfo.prototype, "categories", void 0);
__decorate([
    property({ type: Array })
], PostInfo.prototype, "posts", void 0);
__decorate([
    property({ type: String })
], PostInfo.prototype, "thumbnailObjURL", void 0);
__decorate([
    property({ type: Boolean })
], PostInfo.prototype, "createMode", void 0);
PostInfo = __decorate([
    customElement('post-info')
], PostInfo);
export { PostInfo };
//# sourceMappingURL=post-info.js.map