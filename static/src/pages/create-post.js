import { __decorate } from "tslib";
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { apis } from '../apis/index.js';
import { navigate } from '../components/dom-router/dom-router.js';
import '../components/markdown-view-editor/markdown-view-editor.js';
// eslint-disable-next-line import/no-duplicates
import '../components/post-info/post-info.js';
import { debounce } from '../utils/debounce.js';
import { PageElement } from './abstracts/page-element.js';
let CreatePost = class CreatePost extends PageElement {
    constructor() {
        super(...arguments);
        this.pageTitle = 'Post Logs | 글쓰기';
        this.refCandidates = [];
        this.template = null;
    }
    firstUpdated(changedProps) {
        super.firstUpdated(changedProps);
        this.getTemplate();
    }
    async getTemplate() {
        this.template = await apis.getTemplate();
    }
    get postInfo() {
        const postInfo = this.renderRoot.querySelector('post-info');
        if (!postInfo)
            throw new Error('Failed to find post-info element');
        return postInfo;
    }
    async createPostHandler() {
        const { tempPost, thumbnail } = this.postInfo.serialize();
        if (!this.content)
            throw new Error('작성된 포스팅이 없습니다.');
        await apis.createPost(tempPost, this.content, thumbnail);
        alert('새로운 포스트가 등록 됐습니다.');
        navigate('/');
    }
    render() {
        const valueChangeHandler = debounce((event) => {
            if (event instanceof CustomEvent) {
                const { value } = event.detail;
                this.content = value;
            }
        });
        return html `<section id="create-post">
      <post-info .content=${this.content || ''} createMode></post-info>

      <markdown-view-editor
        @valueChange=${valueChangeHandler}
        .content=${this.template || ''}
      ></markdown-view-editor>

      <section id="button-container">
        <button @click=${this.createPostHandler}>저장</button>
      </section>
    </section> `;
    }
};
CreatePost.styles = css `
    section#create-post {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    section#button-container {
      display: grid;
      gap: 10px;
      justify-content: end;
    }

    button {
      background-color: var(--theme-light-background-color);
      height: 40px;
      min-width: 120px;
      border: 1px dashed var(--theme-red-color);
      font-weight: 600;
      transition: transform 0.2s ease-in-out 0s;
    }
    button:hover {
      transform: scale(1.2, 1.2);
    }
    button:active {
      transform: scale(1, 1);
    }
  `;
__decorate([
    property({ type: Array })
], CreatePost.prototype, "refCandidates", void 0);
__decorate([
    property({ type: String })
], CreatePost.prototype, "content", void 0);
__decorate([
    property({ type: String })
], CreatePost.prototype, "template", void 0);
CreatePost = __decorate([
    customElement('create-post')
], CreatePost);
export { CreatePost };
//# sourceMappingURL=create-post.js.map