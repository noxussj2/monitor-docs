<script setup lang="ts">
const { seo } = useAppConfig()
const config = useRuntimeConfig()

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs')
)
const { data: files } = useLazyAsyncData('search', () =>
  queryCollectionSearchSections('docs'),
{
  server: false
})

const mainNavigation = [
  { label: '文档', icon: 'i-lucide-book-open', to: '/getting-started/introduction' },
  { label: '功能', icon: 'i-lucide-blocks', to: '/features/overview' },
  { label: '性能指标', icon: 'i-lucide-gauge', to: '/features/performance' },
  { label: 'SDK', icon: 'i-lucide-code-xml', to: '/sdk/installation' },
  { label: '会员', icon: 'i-lucide-crown', to: '/membership' }
]

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#00a155' }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useSeoMeta({
  titleTemplate: title => title ? `${title} · PulseWatch` : 'PulseWatch 官方文档',
  description: 'Web 应用性能与用户体验监控平台的产品说明、性能指标与浏览器 SDK 接入指南。',
  ogSiteName: seo?.siteName,
  ogType: 'website',
  ogImage: `${config.public.siteUrl}/og.png`,
  ogImageAlt: 'PulseWatch Web 应用性能与用户体验监控平台官方文档',
  twitterCard: 'summary_large_image',
  twitterImage: `${config.public.siteUrl}/og.png`
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <UHeader
      title="PulseWatch"
      to="/"
    >
      <template #title>
        <span
          class="brand-mark"
          aria-hidden="true"
        >
          <UIcon
            name="i-lucide-activity"
            class="size-5"
          />
        </span>
        <span>PulseWatch</span>
        <UBadge
          label="文档"
          color="neutral"
          variant="soft"
          size="sm"
        />
      </template>

      <UNavigationMenu :items="mainNavigation" />

      <template #right>
        <UContentSearchButton :collapsed="true" />
        <UColorModeButton />
        <UButton
          label="进入控制台"
          icon="i-lucide-arrow-up-right"
          trailing
          color="neutral"
          variant="outline"
          class="hidden sm:inline-flex"
          to="https://apm.noxussj.top"
          target="_blank"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="mainNavigation"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter>
      <template #left>
        <div class="flex items-center gap-2">
          <span
            class="brand-mark brand-mark--small"
            aria-hidden="true"
          >
            <UIcon
              name="i-lucide-activity"
              class="size-4"
            />
          </span>
          <span>© {{ new Date().getFullYear() }} PulseWatch</span>
        </div>
      </template>

      <template #right>
        <UButton
          label="SDK 文档"
          to="/sdk/installation"
          color="neutral"
          variant="link"
        />
        <UButton
          label="会员方案"
          to="/membership"
          color="neutral"
          variant="link"
        />
        <UButton
          icon="i-simple-icons-github"
          to="https://github.com/noxussj2"
          target="_blank"
          color="neutral"
          variant="ghost"
          aria-label="GitHub"
        />
      </template>
    </UFooter>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
