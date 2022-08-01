import { css } from 'lit';
export default css `
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  .hljs {
    background: var(--code-bg-color);
    color: #fff;
    border-radius: 4px;
    box-shadow: var(--common-shadow);
    line-height: var(--wide-spacing);

    @media (prefers-color-scheme: dark) {
      box-shadow: none;
    }
  }
  .hljs-comment {
    color: #506686;
  }
  .hljs-punctuation,
  .hljs-tag {
    color: #444a;
  }
  .hljs-tag .hljs-attr,
  .hljs-tag .hljs-name {
    color: #4db0d7;
  }
  .hljs-attribute,
  .hljs-doctag,
  .hljs-keyword,
  .hljs-meta .hljs-keyword,
  .hljs-name,
  .hljs-selector-tag {
    font-weight: 700;
  }
  .hljs-deletion,
  .hljs-number,
  .hljs-quote,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-string,
  .hljs-template-tag,
  .hljs-type {
    color: #800;
  }
  .hljs-section,
  .hljs-title {
    color: #fff;
    font-weight: 700;
  }
  .hljs-link,
  .hljs-operator,
  .hljs-regexp,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-symbol,
  .hljs-template-variable,
  .hljs-variable {
    color: #ab5656;
  }
  .hljs-literal {
    color: #695;
  }
  .hljs-addition,
  .hljs-built_in,
  .hljs-bullet,
  .hljs-code {
    color: #397300;
  }
  .hljs-meta {
    color: #1f7199;
  }
  .hljs-meta .hljs-string {
    color: #38a;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }

  // Customized
  .hljs.language-bash {
    color: #97a7c8;
  }
  .hljs-keyword {
    color: #d59df6;
  }
  .hljs-string {
    color: #70f49c;
  }
  .hljs-title.class_,
  .hljs-variable {
    color: #e26674;
  }
  .hljs-title.function_ {
    color: #71b1fe;
  }
  .hljs-punctuation {
    color: #ffd703;
  }
  .hljs-attr,
  .hljs-number,
  .hljs-attribute {
    color: #4db0d7;
  }
  .hljs-tag {
    color: #e26674;
  }
  .hljs-tag .hljs-name {
    color: #e26674;
  }
  .hljs-selector-tag,
  .hljs-selector-id {
    color: #ffd703;
  }
`;
//# sourceMappingURL=highlight-style.js.map