import { Post } from '../types/post'
import { ConfigController } from './config-controller'

export class TemplateController {
  public static async generatePostConfig(postConfig: Post) {
    const { CATEGORIES } = await ConfigController.getPostConfig()
    return `
    export interface PostRef {
      title: string
      url: string
    }

    export interface Post {
      title: string
      fileName: string
      description: string
      category: typeof CATEGORIES[keyof typeof CATEGORIES]
      published: boolean
      publishedAt: string
      thumbnailName: string
      tags: string[]
      references?: PostRef[]
      series?: {
        prevPostTitle?: string
        nextPostTitle?: string
      }
    }
    
    export const CATEGORIES = {
      ${Object.keys(CATEGORIES)}
      ['seo']: 'SEO',
      ['javascript']: 'javascript',
      ['css']: 'CSS',
      ['react']: 'React',
      ['ui-and-ux']: 'UI and UX',
      ['typescript']: 'TypeScript',
      ['elasticsearch']: 'ElasticSearch',
      ['infrastructure']: 'Infrastructure',
      ['dev-env']: '개발환경',
      ['cloud']: 'Cloud',
      ['security']: 'Security',
      ['nodejs']: 'NodeJS',
      ['react-native']: 'React Native',
      ['roadmap-frontend']: 'Roadmap Frontend',
    }
    
    export const posts: Post[] = [
      {
        title: '검색 엔진 최적화를 위한 설정',
        fileName: 'config-for-seo.md',
        description:
          '검색 엔진 최적화를 위한 설정 (Title, Meta Tag, 절대경로, robots.txt, sitemap.xml)',
        category: CATEGORIES['seo'],
        published: true,
        publishedAt: '2021-10-10',
        tags: [
          'Search Engine Optimization',
          'SEO',
          '검색',
          '메타',
          '메타 태그',
          'meta tag',
          '검색엔진',
          '검색엔진 최적화',
          'robots.txt',
          'sitemap.xml',
        ],
        thumbnailName: 'seo-thumbnail.jpg',
      },
      {
        title: 'Tagged Template Literal',
        fileName: 'tagged-template-literal.md',
        description: 'Javascript ES6 Tagged Template Literal',
        category: CATEGORIES['javascript'],
        published: true,
        publishedAt: '2021-10-11',
        tags: ['javascript', 'tagged template', 'tagged template literal', 'es6'],
        thumbnailName: 'tagged-template-literal.png',
      },
      {
        title: 'Iterator and Generator',
        fileName: 'iterator-generator.md',
        description:
          'Javascript ES6 Iterator & Generator, 열거형, 제너레이터 함수, generator function, yield, function*',
        category: CATEGORIES['javascript'],
        published: true,
        publishedAt: '2021-10-17',
        tags: [
          'javascript',
          'iterator',
          'iterable',
          'generator',
          'es6',
          'function*',
          'yield',
        ],
        thumbnailName: 'iterator-generator.png',
      },
      {
        title: 'Proxy',
        fileName: 'proxy.md',
        description:
          'Javascript ES6 Proxy, Proxy, Trap, 프락시를 이용한 객체 조작의 제어',
        category: CATEGORIES['javascript'],
        published: true,
        publishedAt: '2021-10-25',
        tags: ['javascript', 'proxy', 'trap', 'es6', '프록시'],
        thumbnailName: 'proxy.png',
      },
      {
        title: 'CSS Position',
        fileName: 'css-position.md',
        description:
          'CSS Position (Static, Absolute, Fixed, Sticky)에 따른 고정 헤더 스타일',
        category: CATEGORIES['css'],
        published: true,
        publishedAt: '2021-10-26',
        tags: [
          'css',
          'position',
          'static',
          'absolute',
          'fixed',
          'sticky',
          'header',
          'style',
          '스타일',
          '포지션',
          '헤더',
        ],
        thumbnailName: 'css-position.png',
      },
      {
        title: '고차 컴퍼넌트 (HOC: Higher Order Component)',
        fileName: 'hoc.md',
        description: 'React - 고차 컴퍼넌트를 이용한 컴퍼넌트의 재사용',
        category: CATEGORIES['react'],
        published: true,
        publishedAt: '2021-10-30',
        tags: ['hoc', 'higher order component', '고차 컴퍼넌트', 'react', '리액트'],
        thumbnailName: 'hoc.png',
      },
      {
        title: 'Scroll sequence animation',
        fileName: 'scroll-sequence-animation.md',
        description:
          'Apple 제품 페이지 같은 애니메이션을 구현해보자 - Scroll sequence animation',
        category: CATEGORIES['ui-and-ux'],
        published: true,
        publishedAt: '2021-10-31',
        tags: ['scroll sequence', 'scroll sequence animation', 'ui', 'ux'],
        thumbnailName: 'scroll-sequence.png',
      },
      {
        title: 'Any | Unknown | Never',
        fileName: 'any-unknown-never.md',
        description: 'TypeScript - Any | Unknown | Never',
        category: CATEGORIES['typescript'],
        published: true,
        publishedAt: '2021-11-15',
        tags: ['typescript', 'any', 'unknown', 'never', '타입스크립트'],
        thumbnailName: 'ts-any-unknown-never.png',
      },
      {
        title: 'Elasticsearch: Full-text search (전문검색)',
        fileName: 'full-text-search.md',
        description: 'Elasticsearch를 이용한 Full-text search',
        category: CATEGORIES['elasticsearch'],
        published: true,
        publishedAt: '2021-11-16',
        tags: [
          'elasticsearch',
          'full-text search',
          'searching engine',
          '엘라스틱서치',
          '전문검색',
        ],
        thumbnailName: 'elasticsearch-full-text-search.png',
      },
      {
        title: 'Nx build system 맛보기',
        fileName: 'monorepo-with-nx.md',
        description: 'Nx build system을 이용한 Monorepo 구성하기',
        category: CATEGORIES['infrastructure'],
        published: true,
        publishedAt: '2022-02-12',
        tags: [
          'nx',
          'build',
          'build system',
          'monorepo',
          '빌드',
          '빌드 시스템',
          '모노리포',
        ],
        thumbnailName: 'monorepo-with-nx.png',
        series: {
          prevPostTitle: 'Nx build system 맛보기',
          nextPostTitle: 'yarn berry로 구성하는 monorepo',
        },
      },
      {
        title: 'yarn berry로 구성하는 monorepo',
        fileName: 'yarn-berry-monorepo.md',
        description:
          'yarn berry와 yarn workspaces를 이용해 monorepo 구성 - 환경 설정, 샘플 프로젝트',
        category: CATEGORIES['infrastructure'],
        published: true,
        publishedAt: '2022-02-26',
        tags: [
          'yarn',
          'yarn berry',
          'berry',
          'monorepo',
          'workspace',
          'workspaces',
          '모노리포',
          'zero-install',
        ],
        thumbnailName: 'yarn-berry-monorepo.png',
        series: {
          prevPostTitle: 'Nx build system 맛보기',
        },
        references: [
          {
            title: 'yarn workspaces',
            url: 'https://yarnpkg.com/features/workspaces',
          },
        ],
      },
      {
        title: 'ESLint - Plugin and Extends',
        fileName: 'eslint-plugin-and-extends.md',
        description: 'ESLint의 Plugin과 Extends의 차이는 무엇일까?',
        category: CATEGORIES['dev-env'],
        published: true,
        publishedAt: '2022-02-27',
        tags: [
          '개발환경',
          'eslint',
          'plugin',
          'extends',
          'eslint plugin',
          'eslint extends',
          'lint',
        ],
        thumbnailName: 'eslint-plugin-and-extends.png',
        references: [
          {
            title: 'eslint-plugin-react Github repository',
            url: 'https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L118-L179',
          },
        ],
      },
      {
        title: 'Focus on Button - Safari VS Chrome',
        fileName: 'focus-on-button-safari-vs-chrome.md',
        description: 'Safari, Chrome 브라우저에 따라 달라지는 button의 focus 속성',
        category: CATEGORIES['css'],
        published: true,
        publishedAt: '2022-02-28',
        tags: [
          'CSS',
          'focus',
          'focus-within',
          'focus-visible',
          'safari',
          'chrome',
          'browser',
          '사파리',
          '크롬',
          '브라우저',
        ],
        thumbnailName: 'focus-on-button.png',
        references: [
          {
            title: 'Clicking and focus - MDN Web Docs',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus',
          },
        ],
      },
      {
        title: 'Heroku로 Node.js 애플리케이션 배포하기',
        fileName: 'deploy-nodejs-via-heroku.md',
        description: 'Heroku를 이용한 NodeJS  애플리케이션 배포하기',
        category: CATEGORIES['cloud'],
        published: true,
        publishedAt: '2022-03-04',
        tags: [
          'heroku',
          'node.js',
          'cloud',
          'cloud service',
          'paas',
          'deploy',
          '배포',
        ],
        thumbnailName: 'deploy-node-js-via-heroku.png',
        references: [
          {
            title: 'Heroku Dev Center',
            url: 'https://devcenter.heroku.com/',
          },
          {
            title: 'Wiki - PaaS',
            url: 'https://en.wikipedia.org/wiki/Platform_as_a_service',
          },
        ],
      },
      {
        title: '브라우저 보안 정책 CHIPS - (feat. Chrome 쿠키 입력 불가)',
        fileName: 'chips.md',
        description:
          'CHIPS - Cookies Having Independent Partitioned State\n(Chrome 98 버그를 찾아 헤매다 발견하게 된 브라우저의 Cookie 관리 정책)',
        category: CATEGORIES['security'],
        published: true,
        publishedAt: '2022-03-06',
        tags: [
          'CHIPS',
          'cookie',
          'security',
          'browser',
          'policy',
          'security policy',
          'chrome',
        ],
        thumbnailName: 'chips.png',
        references: [
          {
            title: 'Chrome Platform Status',
            url: 'https://chromestatus.com/feature/5179189105786880',
          },
        ],
      },
      {
        title: 'Apollo Server + TypeGraphQL을 이용한 GraphQL API 서버 구성하기',
        fileName: 'graphql-with-apollo-server-typegraphql.md',
        description:
          'Apollo Server와 TypeGraphQL을 사용한 Node.JS GraphQL API 서버 구성하기',
        category: CATEGORIES['nodejs'],
        published: true,
        publishedAt: '2022-03-10',
        tags: [
          'graphql',
          'apollo',
          'apollo-server',
          'node.js',
          'typescript',
          'typegraphql',
          'api',
          'api server',
        ],
        thumbnailName: 'graphql-apollo-typegraphql.png',
        references: [
          {
            title: 'Apollo Server',
            url: 'https://www.apollographql.com',
          },
          {
            title: 'TypeGraphQL',
            url: 'https://typegraphql.com',
          },
          {
            title: 'GraphQL',
            url: 'https://graphql.org',
          },
          {
            title: 'DataLoader - GitHub Repository',
            url: 'https://github.com/graphql/dataloader',
          },
          {
            title: 'Sample Repository',
            url: 'https://github.com/possible819/graphql-sample',
          },
        ],
      },
      {
        title: 'React Native - 개발환경 구성하기',
        fileName: 'react-native-dev-env.md',
        description:
          'Mac OS에서 iOS 애플리케이션 개발을 위한 React Native 개발환경 구성하기',
        category: CATEGORIES['react-native'],
        published: true,
        publishedAt: '2022-03-26',
        tags: [
          'react native',
          'RN',
          '리액트 네이티브',
          '개발환경',
          '개발환경 구성하기',
          'cross platform',
          'react native cli',
          'macos',
          'ios',
        ],
        thumbnailName: 'react-native-dev-env.png',
        references: [
          {
            title: 'React Native',
            url: 'https://reactnative.dev/docs/environment-setup',
          },
          {
            title: 'NVM',
            url: 'https://github.com/nvm-sh/nvm',
          },
        ],
      },
      {
        title: 'Internet - Roadmap.sh (frontend)',
        fileName: 'internet.md',
        description:
          'Roadmap.sh frontend - Internet\nRoadmap.sh - frontend 학습 순서에 따라 정리하는 포스팅 1',
        category: CATEGORIES['roadmap-frontend'],
        published: true,
        publishedAt: '2022-07-20',
        tags: [
          'roadmap',
          'roadmap.sh',
          'frontend',
          'internet',
          'packet',
          'routing',
          'protocol',
          '인터넷',
          '패킷',
          '프로토콜',
          '라우팅',
        ],
        thumbnailName: 'roadmap-frontend-internet.png',
        references: [
          {
            title: 'Roadmap.sh',
            url: 'https://roadmap.sh/frontend',
          },
        ],
      },
    ]
    
    export default posts
    
    `
  }

  public static generateContentMarkdown(content: string) {}
}
