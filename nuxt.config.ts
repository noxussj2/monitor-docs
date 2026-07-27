const documentRoutes = [
  '/getting-started',
  '/getting-started/introduction',
  '/getting-started/quick-start',
  '/getting-started/concepts',
  '/features',
  '/features/overview',
  '/features/performance',
  '/features/errors',
  '/features/analytics',
  '/sdk',
  '/sdk/installation',
  '/sdk/configuration',
  '/sdk/api',
  '/sdk/privacy',
  '/account',
  '/account/projects',
  '/account/quota'
]

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 3
        }
      }
    }
  },

  mdc: {
    highlight: {
      langs: ['js', 'json', 'ts', 'vue', 'html', 'bash', 'sh', 'md', 'yaml']
    }
  },

  ui: {
    fonts: false
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/membership': { prerender: true },
    '/**': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: ['/', '/membership', ...documentRoutes],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'PulseWatch 官方文档',
    description: 'Web 应用性能与用户体验监控平台的产品说明、性能指标与浏览器 SDK 接入指南',
    full: {
      title: 'PulseWatch 完整官方文档',
      description: 'PulseWatch 产品、指标、SDK、隐私与额度规则的完整文档'
    },
    sections: [
      {
        title: '开始使用',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/getting-started%' }]
      },
      {
        title: '产品能力',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/features%' }]
      },
      {
        title: 'SDK 接入',
        contentCollection: 'docs',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/sdk%' }]
      }
    ]
  }
})
