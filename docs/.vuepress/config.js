module.exports = {
  title: 'CRender_Guide',
  description: 'Just playing around',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  host: 'localhost',
  port: 5002,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'CRender',
      description: '基于Canvas的矢量图形渲染插件',
    },
    '/EN/': {
      lang: 'en-US',
      title: 'CRender',
      description: 'Canvas-based vector graphics rendering plugin',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          {
            text: '指南',
            link: '/guide/',
          },
          {
            text: '扩展',
            link: '/extend/',
          },
          {
            text: '支持',
            link: '/support/',
          },
          {
            text: 'GitHub',
            link: 'https://github.com/DataV-Team/Crender',
          },
        ],
        sidebar: {
          '/guide/': ['', 'crender', 'graph', 'style', 'graphs'],
          '/extend/': [''],
          '/support/': [],
        },
      },
      '/EN/': {
        selectText: 'Languages',
        label: 'English',
        nav: [
          {
            text: 'Guide',
            link: '/EN/guide/',
          },
          {
            text: 'Extend',
            link: '/EN/extend/',
          },
          {
            text: 'Support',
            link: '/EN/support/',
          },
          {
            text: 'GitHub',
            link: 'https://github.com/DataV-Team/Crender',
          },
        ],
        sidebar: {
          '/EN/guide/': ['', 'crender', 'graph', 'style', 'graphs'],
          '/EN/extend/': [''],
          '/EN/support/': [],
        },
      },
    },
  },
}
