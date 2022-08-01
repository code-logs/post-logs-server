import { __decorate } from "tslib";
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { apis } from '../apis/index.js';
import '../components/markdown-view-editor/markdown-view-editor.js';
import '../components/now-loading/now-loading.js';
// eslint-disable-next-line import/no-duplicates
import '../components/post-info/post-info.js';
import { buttonBoxStyle } from '../components/styles/styles.js';
import { PageElement } from './abstracts/page-element.js';
import { navigate } from '../components/dom-router/dom-router.js';
import { debounce } from '../utils/debounce.js';
let PostDetail = class PostDetail extends PageElement {
    constructor() {
        super();
        this.pageTitle = '';
        this.enablePreview = false;
        this.postFileName = window.location.pathname.replace(/^\/posts\//g, '');
        if (!this.postFileName)
            window.location.href = '/';
        this.pageTitle = `Post Logs | ${this.postFileName}`;
    }
    get postInfo() {
        const postInfo = this.renderRoot.querySelector('post-info');
        if (!postInfo)
            throw new Error('No post info element found');
        return postInfo;
    }
    firstUpdated() {
        if (this.postFileName)
            this.fetchPost(this.postFileName);
    }
    async fetchPost(postFileName) {
        this.post = await apis.getPost(postFileName);
    }
    async deletePost() {
        var _a;
        if (!((_a = this.post) === null || _a === void 0 ? void 0 : _a.fileName))
            throw new Error('No post fileName found');
        const answer = window.confirm('포스팅을 삭제할까요?');
        if (answer)
            await apis.deletePost(this.post.fileName);
        alert('포스팅이 삭제 됐습니다.');
        navigate('/');
    }
    async updatePost() {
        var _a, _b;
        try {
            const postId = (_a = this.post) === null || _a === void 0 ? void 0 : _a.id;
            if (!postId)
                throw new Error('포스팅 아이디를 찾을 수 없습니다.');
            const content = this.content || ((_b = this.post) === null || _b === void 0 ? void 0 : _b.content);
            if (!content)
                throw new Error('작성된 포스팅이 없습니다.');
            const { tempPost, thumbnail } = this.postInfo.serialize();
            const answer = window.confirm('포스팅의 변경사항을 저장할까요?');
            if (!answer)
                return;
            await apis.updatePost(postId, tempPost, content, thumbnail);
            alert('포스팅이 저장 됐습니다.');
            navigate('/');
        }
        catch (e) {
            if (e instanceof Error) {
                alert(e.message);
            }
            else {
                alert('Unexpected error occurred');
            }
            throw e;
        }
    }
    render() {
        var _a;
        if (!((_a = this.post) === null || _a === void 0 ? void 0 : _a.content))
            return html `<now-loading></now-loading>`;
        const valueChangeHandler = debounce((event) => {
            if (event instanceof CustomEvent) {
                const { value } = event.detail;
                this.content = value;
            }
        });
        return html `
      <section id="post-detail">
        <post-info
          .post=${this.post}
          .content=${this.content || this.post.content}
        ></post-info>

        <markdown-view-editor
          enablePreview
          @valueChange=${valueChangeHandler}
          .content=${this.post.content}
        ></markdown-view-editor>

        <div class="button-container">
          ${this.post.isCreated
            ? html `<button danger @click=${this.deletePost}>삭제</button>`
            : ''}

          <button @click=${this.updatePost}>저장</button>
        </div>
      </section>
    `;
    }
};
PostDetail.styles = css `
    ${buttonBoxStyle}
    section#post-detail {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
  `;
__decorate([
    property({ type: Boolean })
], PostDetail.prototype, "enablePreview", void 0);
__decorate([
    property({ type: String })
], PostDetail.prototype, "postFileName", void 0);
__decorate([
    property({ type: Object })
], PostDetail.prototype, "post", void 0);
__decorate([
    property({ type: String })
], PostDetail.prototype, "content", void 0);
PostDetail = __decorate([
    customElement('post-detail')
], PostDetail);
export { PostDetail };
//# sourceMappingURL=post-detail.js.map