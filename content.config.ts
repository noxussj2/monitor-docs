import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const docsSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional()
  })).optional()
})

export default defineContentConfig({
  collections: {
    docs_zh_cn: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['zh-MO/**', 'en/**']
      },
      schema: docsSchema
    }),
    docs_zh_mo: defineCollection({
      type: 'page',
      source: {
        include: 'zh-MO/**',
        prefix: ''
      },
      schema: docsSchema
    }),
    docs_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: ''
      },
      schema: docsSchema
    })
  }
})
