module.exports = {
  title: 'CRender',
  description: '基于Canvas的矢量图形渲染插件',
  head: [
    ['meta', { name: 'keywords', content: 'crender,bi,可视化,开源,免费,大屏' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  host: 'localhost',
  port: 5002,
  themeConfig: {
    nav: [
      {
        text: '0.x',
        link: 'http://0x.crender.jiaminghi.com',
      },
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
        link: 'https://github.com/DataV-Team/CRender',
      },
    ],
    sidebar: {
      '/guide/': ['', 'crender', 'graph', 'style', 'graphs'],
      '/extend/': [''],
      '/support/': [],
    },
  },
}
