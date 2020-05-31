module.exports = {
    title: 'Away的博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/1.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base:'/fyc-Away/',
    themeConfig: {
      logo: '/1.jpg',  // 左上角logo
      nav:[ // 导航栏配置
        {text: '首页', link: '/' },
        {text: 'vue', link: '/vue' },
        {text: 'react', link: '/react' },
        {text: '其它', link: '/other' },
        {text: 'csdn博客', link: 'https://blog.csdn.net/fyc_away'},
        {text: 'github', link: 'https://github.com/fyc-Away' },   
      ],
      sidebar: 'auto', // 侧边栏配置
      sidebarDepth: 2
    },
    
    // theme: 'vuepress-theme-xx'
  };