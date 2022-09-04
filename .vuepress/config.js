module.exports = {
  title: "Zejun Li",
  description: 'Programmer',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'About Me', link: '/docs/aboutme/'},
      { text: 'Contact', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/Jun7i'},
          { text: 'LinkedIn', link: 'https://www.linkedin.com/in/zejun-li-70ab731b4/' }
        ]
      }
    ],  
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      }
    },
    friendLink: [
      {
        title: 'test',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '151495238@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'test',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'Zejun Li',
    // 作者头像
    authorAvatar: '/avatar.png',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2022'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    //valineConfig: {
    //appId: 'gRautPrkF95XsCpJOnH7OMXx-gzGzoHsz',// your appId
    //appKey: 'aXGIr44aujhS62tLyn0rRnKe', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  }
}  
