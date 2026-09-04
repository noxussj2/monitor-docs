<script setup lang="ts">
const config = useRuntimeConfig()
const { locale, setLocale, t } = useI18n()
const localePath = useLocalePath()
const localeHead = useLocaleHead({ seo: true })
const docsCollection = useDocsCollection()

const { data: navigation } = await useAsyncData(`navigation-${locale.value}`, () =>
  queryCollectionNavigation(docsCollection.value),
{
  watch: [locale]
}
)
const { data: files } = useLazyAsyncData(`search-${locale.value}`, () =>
  queryCollectionSearchSections(docsCollection.value),
{
  server: false,
  watch: [locale]
})

function localizeContentPath(path: string) {
  const [pathname, hash] = path.split('#')
  const localized = localePath(pathname || '/')
  return hash ? `${localized}#${hash}` : localized
}

function localizeNavigation(items: typeof navigation.value): typeof navigation.value {
  return items?.map(item => ({
    ...item,
    path: localizeContentPath(item.path),
    children: item.children ? localizeNavigation(item.children) : undefined
  })) || []
}

const localizedNavigation = computed(() => localizeNavigation(navigation.value))
const localizedFiles = computed(() => files.value?.map(file => ({
  ...file,
  id: localizeContentPath(file.id)
})))

const mainNavigation = computed(() => [
  { label: t('nav.docs'), icon: 'i-lucide-book-open', to: localePath('/getting-started/introduction') },
  { label: t('nav.features'), icon: 'i-lucide-blocks', to: localePath('/features/overview') },
  { label: t('nav.performance'), icon: 'i-lucide-gauge', to: localePath('/features/performance') },
  { label: t('nav.sdk'), icon: 'i-lucide-code-xml', to: localePath('/sdk/installation') },
  { label: t('nav.membership'), icon: 'i-lucide-crown', to: localePath('/membership') }
])

const availableLocales = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-MO', label: '繁體中文' },
  { code: 'en', label: 'English' }
] as const

const languageItems = computed(() => availableLocales.map(item => ({
  label: item.label,
  icon: item.code === locale.value ? 'i-lucide-check' : undefined,
  onSelect: () => void setLocale(item.code)
})))

const { trackEvent } = useMonitorTracking()

function trackEnterConsole() {
  void trackEvent('docs_enter_console', {
    operation: '进入控制台',
    target: 'admin_console',
    url: 'https://apm.noxussj.top'
  })
}

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#00a155' },
    ...(localeHead.value.meta || [])
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(localeHead.value.link || [])
  ],
  script: [
    {
      'defer': true,
      'src': config.public.monitorSdkUrl,
      'data-project-key': 'mk_4850bba5f668775b0e6d21e28ba5bbc3fd234b3ba288f8b0'
    }
  ],
  htmlAttrs: {
    ...(localeHead.value.htmlAttrs || {}),
    lang: locale.value
  }
}))

useSeoMeta({
  titleTemplate: (title?: string) => title ? `${title} · PulseWatch` : t('site.name'),
  description: () => t('site.description'),
  ogSiteName: () => t('site.name'),
  ogType: 'website',
  ogImage: `${config.public.siteUrl}/og.png`,
  ogImageAlt: () => t('site.ogAlt'),
  twitterCard: 'summary_large_image',
  twitterImage: `${config.public.siteUrl}/og.png`
})

provide('navigation', localizedNavigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <UHeader
      title="PulseWatch"
      :to="localePath('/')"
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
          :label="t('nav.docs')"
          color="neutral"
          variant="soft"
          size="sm"
        />
      </template>

      <UNavigationMenu :items="mainNavigation" />

      <template #right>
        <UContentSearchButton :collapsed="true" />
        <UDropdownMenu
          :items="languageItems"
          :modal="false"
        >
          <UButton
            icon="i-lucide-languages"
            color="neutral"
            variant="ghost"
            :aria-label="t('nav.language')"
          />
        </UDropdownMenu>
        <UColorModeButton />
        <UButton
          :label="t('nav.console')"
          icon="i-lucide-arrow-up-right"
          trailing
          color="neutral"
          variant="outline"
          class="hidden sm:inline-flex"
          to="https://apm.noxussj.top"
          target="_blank"
          @click="trackEnterConsole"
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
          :label="t('nav.sdkDocs')"
          :to="localePath('/sdk/installation')"
          color="neutral"
          variant="link"
        />
        <UButton
          :label="t('nav.plans')"
          :to="localePath('/membership')"
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
        :files="localizedFiles"
        :navigation="localizedNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
