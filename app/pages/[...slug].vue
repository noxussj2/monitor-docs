<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

definePageMeta({
  layout: 'docs',
  key: route => route.fullPath
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const contentPath = route.path.replace(/\/+$/, '') || '/'

const { data: page } = await useAsyncData(`doc-${contentPath}`, () =>
  queryCollection('docs').path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '没有找到这个页面', fatal: true })
}

const { data: surround } = await useAsyncData(`surround-${contentPath}`, () =>
  queryCollectionItemSurroundings('docs', contentPath, {
    fields: ['description']
  })
)

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
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body.toc.links"
      >
        <template #bottom>
          <div class="hidden space-y-6 lg:block">
            <USeparator type="dashed" />
            <UPageLinks
              :title="toc?.bottom?.title"
              :links="toc?.bottom?.links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
