import { __decorate } from "tslib";
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { apis } from '../apis/index.js';
import '../components/post-card/post-card.js';
import { inputStyle, labelStyle } from '../components/styles/styles.js';
import { PageElement } from './abstracts/page-element.js';
let PostList = class PostList extends PageElement {
    constructor() {
        super(...arguments);
        this.pageTitle = 'Post Logs | 포스팅';
        this.posts = [];
        this.keyword = '';
    }
    firstUpdated() {
        this.fetchPosts();
    }
    async fetchPosts() {
        this.posts = await apis.getPosts();
    }
    render() {
        const posts = this.posts.filter((post) => {
            if (!this.keyword)
                return true;
            return (`${post.title}${post.category}${post.tags
                .map(({ name }) => name)
                .join(',')}${post}`
                .toLowerCase()
                .indexOf(this.keyword) >= 0);
        });
        return html `
      <section id="post-list">
        <form id="search-form">
          <label>
            <span>Keyword</span>
            <input
              type="search"
              placeholder="Search..."
              @input=${(event) => {
            const input = event.currentTarget;
            this.keyword = input.value;
        }}
            />
          </label>
        </form>
        <ul>
          ${posts.map((post) => html `<li>
                <post-card .post=${post}></post-card>
              </li>`)}
        </ul>
      </section>
    `;
    }
};
PostList.styles = css `
    ${labelStyle}
    ${inputStyle}
    #post-list {
      display: grid;
      gap: 10px;
    }
    #search-form {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `;
__decorate([
    property({ type: Array })
], PostList.prototype, "posts", void 0);
__decorate([
    property({ type: String })
], PostList.prototype, "keyword", void 0);
PostList = __decorate([
    customElement('post-list')
], PostList);
export { PostList };
//# sourceMappingURL=post-list.js.map