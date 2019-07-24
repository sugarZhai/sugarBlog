module.exports={
  title: 'sugarZhai',
  description: 'share by learning and grow by sharing',
  base: '/sugarBlog/',
  themeConfig: {
    nav: [
      { text: '编程指南', link: '/Code/basic' },
      { text: '产品初探', link: '/Product/' },
      { text: '生活鸡汤', link: '/Life/' },
      { text: '关于本站', link: '/About/' },
    ],
    sidebar:{
      '/Code/':[
        ['/Code/basic','自检清单'],
        ['/Code/article','精选文章'],
        ['/Code/community','社区门户'],
        ['/Code/interview','面试笔记'],
      ],
      '/Life/':[['/Life/blog','个人'],['/Life/blog1','组织']],
      '/Product/':[
        {
          title: '产品1',
          children: [['/Product/product-1/p1','产品11']]
        },
        {
          title: '产品2',
          children: [['/Product/product-2/p2','产品22']]
        }
      ]
    }
  }
}