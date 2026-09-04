<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

definePageMeta({
  layout: 'docs',
  key: route => route.fullPath
})

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const docsCollection = useDocsCollection()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : String(route.params.slug || '')
const contentPath = `/${slug}`.replace(/\/+$/, '') || '/'

const { data: page } = await useAsyncData(`doc-${locale.value}-${contentPath}`, () =>
  queryCollection(docsCollection.value).path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: t('errors.notFound'), fatal: true })
}

const { data: surround } = await useAsyncData(`surround-${locale.value}-${contentPath}`, () =>
  queryCollectionItemSurroundings(docsCollection.value, contentPath, {
    fields: ['description']
  })
)

const localizedSurround = computed(() => (
  surround.value as Array<ContentNavigationItem | null> | null
)?.map(item => item
  ? { ...item, path: localePath(item.path) }
  : null)) as Ref<ContentNavigationItem[] | undefined>

const helpLinks = computed(() => [
  {
    icon: 'i-lucide-circle-help',
    label: t('docs.quickStart'),
    to: localePath('/getting-started/quick-start')
  },
  {
    icon: 'i-lucide-code-xml',
    label: t('docs.sdkGuide'),
    to: localePath('/sdk/installation')
  }
])

const headline = computed(() => findPageHeadline(navigation.value, page.value))

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :headline="headline"
      :ui="{
        title: 'sm:whitespace-nowrap'
      }"
    />

    <UPageBody>
      <ContentRenderer :value="page" />

      <USeparator v-if="surround?.length" />
      <UContentSurround :surround="localizedSurround" />
    </UPageBody>

    <template
      v-if="page.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="t('docs.toc')"
        :links="page.body.toc.links"
      >
        <template #bottom>
          <div class="hidden space-y-6 lg:block">
            <USeparator type="dashed" />
            <UPageLinks
              :title="t('docs.help')"
              :links="helpLinks"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
