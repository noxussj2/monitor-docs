export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  },
  uiPro: {
    header: {
      slots: {
        root: 'bg-default/90 supports-[backdrop-filter]:bg-default/75'
      }
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'PulseWatch 官方文档',
    description: 'Web 应用性能与用户体验监控平台官方文档'
  },
  toc: {
    title: '本页内容',
    bottom: {
      title: '需要帮助？',
      links: [
        {
          icon: 'i-lucide-circle-help',
          label: '查看快速开始',
          to: '/getting-started/quick-start'
        },
        {
          icon: 'i-lucide-code-xml',
          label: 'SDK 接入指南',
          to: '/sdk/installation'
        }
      ]
    }
  }
})
