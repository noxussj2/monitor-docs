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
    '@nuxtjs/i18n',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  content: {
    watch: {
      enabled: false
    },
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      monitorSdkUrl: process.env.NUXT_PUBLIC_MONITOR_SDK_URL || 'https://apm.noxussj.top/monitor.min.js'
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
      routes: [
        '/',
        '/membership',
        ...documentRoutes
      ],
      crawlLinks: true,
      concurrency: 4
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

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
    langDir: 'locales',
    locales: [
      {
        code: 'zh-CN',
        name: '简体中文',
        language: 'zh-CN',
        file: 'zh-CN.json'
      },
      {
        code: 'zh-MO',
        name: '繁體中文',
        language: 'zh-MO',
        file: 'zh-MO.json'
      },
      {
        code: 'en',
        name: 'English',
        language: 'en',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'tracevista_docs_locale',
      redirectOn: 'root',
      fallbackLocale: 'zh-CN'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'TraceVista 官方文档',
    description: 'Web 应用性能与用户体验监控平台的产品说明、性能指标与浏览器 SDK 接入指南',
    full: {
      title: 'TraceVista 完整官方文档',
      description: 'TraceVista 产品、指标、SDK、隐私与额度规则的完整文档'
    },
    sections: [
      {
        title: '开始使用',
        contentCollection: 'docs_zh_cn',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/getting-started%' }]
      },
      {
        title: '产品能力',
        contentCollection: 'docs_zh_cn',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/features%' }]
      },
      {
        title: 'SDK 接入',
        contentCollection: 'docs_zh_cn',
        contentFilters: [{ field: 'path', operator: 'LIKE', value: '/sdk%' }]
      }
    ]
  }
})
