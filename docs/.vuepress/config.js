module.exports={
  title: 'sugarZhai',
  description: 'share 、learn 、grow ',
  base: '/sugarBlog/',
  themeConfig: {
    nav: [
      { text: '编程指南', link: '/Code/basic' },
      { text: '产品初探', link: '/Product/thinking' },
      { text: '生活随笔', link: '/Life/qianxun' },
      { text: '关于作者', link: '/About/' },
    ],
    sidebar:{
      '/Code/':[
        ['/Code/basic','自检清单'],
        ['/Code/article','精选文章'],
        ['/Code/community','社区门户'],
        ['/Code/interview','面试笔记'],
      ],
      '/Product/':[
        ['/Product/thinking','职业思考'],
        ['/Product/english','英语学习APP体验分享'],
        ['/Product/viewpoint','产品观'],
        ['/Product/one-year','我做产品经理的这一年'],
      ],
      '/Life/':[
        ['/Life/qianxun','勿忘初心'],
        ['/Life/talent','隐形天赋'],
        ['/Life/time','生命来来往往，来日并不方长'],
        ['/Life/dinner','指缝太宽，时光太瘦'],
      ],
     
    }
  }
}