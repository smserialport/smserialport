import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh',
  description: '通过串口发送短信',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() }
    },

    editLink: {
      pattern: 'https://github.com/imba97/smserialport/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      link: '/zh/guide/what-is-smserialport',
      activeMatch: '/zh/guide/'
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: 'SMSerialport 是什么？', link: 'what-is-smserialport' },
        { text: '快速开始', link: 'getting-started' }
      ]
    },
    {
      text: '其他',
      collapsed: false,
      items: [{ text: '开发契机', link: 'opportunity' }]
    }
  ]
}
