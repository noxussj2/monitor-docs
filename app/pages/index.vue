<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const capabilities = computed(() => [
  {
    index: '01',
    icon: 'i-lucide-chart-no-axes-combined',
    title: t('home.capabilities.analyticsTitle'),
    description: t('home.capabilities.analyticsDescription'),
    to: localePath('/features/analytics')
  },
  {
    index: '02',
    icon: 'i-lucide-gauge',
    title: t('home.capabilities.performanceTitle'),
    description: t('home.capabilities.performanceDescription'),
    to: localePath('/features/performance')
  },
  {
    index: '03',
    icon: 'i-lucide-bug',
    title: t('home.capabilities.errorsTitle'),
    description: t('home.capabilities.errorsDescription'),
    to: localePath('/features/errors')
  },
  {
    index: '04',
    icon: 'i-lucide-mouse-pointer-click',
    title: t('home.capabilities.eventsTitle'),
    description: t('home.capabilities.eventsDescription'),
    to: localePath('/features/analytics')
  }
])

const vitalMetrics = computed(() => [
  { name: 'LCP', label: t('home.metrics.lcp'), value: '≤ 2.5s', width: '82%' },
  { name: 'INP', label: t('home.metrics.inp'), value: '≤ 200ms', width: '74%' },
  { name: 'CLS', label: t('home.metrics.cls'), value: '≤ 0.1', width: '90%' },
  { name: 'TTFB', label: t('home.metrics.ttfb'), value: t('home.metrics.lower'), width: '68%' }
])

const performanceGroups = computed(() => [
  {
    icon: 'i-lucide-image',
    metrics: 'LCP / FCP',
    title: t('home.performance.contentTitle'),
    description: t('home.performance.contentDescription')
  },
  {
    icon: 'i-lucide-mouse-pointer-2',
    metrics: 'INP / TBT',
    title: t('home.performance.interactionTitle'),
    description: t('home.performance.interactionDescription')
  },
  {
    icon: 'i-lucide-layout-template',
    metrics: 'CLS',
    title: t('home.performance.stabilityTitle'),
    description: t('home.performance.stabilityDescription')
  },
  {
    icon: 'i-lucide-server',
    metrics: 'TTFB',
    title: t('home.performance.serverTitle'),
    description: t('home.performance.serverDescription')
  }
])

const workflow = computed(() => [
  {
    index: '01',
    title: t('home.performance.connect'),
    description: t('home.performance.connectDescription')
  },
  {
    index: '02',
    title: t('home.performance.observe'),
    description: t('home.performance.observeDescription')
  },
  {
    index: '03',
    title: t('home.performance.optimize'),
    description: t('home.performance.optimizeDescription')
  }
])

const sdkFeatures = computed(() => [
  {
    icon: 'i-lucide-zap',
    title: t('home.sdk.autoTitle'),
    description: t('home.sdk.autoDescription')
  },
  {
    icon: 'i-lucide-route',
    title: t('home.sdk.spaTitle'),
    description: t('home.sdk.spaDescription')
  },
  {
    icon: 'i-lucide-shield-check',
    title: t('home.sdk.privacyTitle'),
    description: t('home.sdk.privacyDescription')
  }
])

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription')
})
</script>

<template>
  <div>
    <UPageHero
      orientation="horizontal"
      :headline="t('home.hero.headline')"
      :links="[
        { label: t('home.hero.quickStart'), to: localePath('/getting-started/quick-start'), icon: 'i-lucide-rocket' },
        { label: t('home.hero.readSdk'), to: localePath('/sdk/installation'), color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
      ]"
      :ui="{
        root: 'overflow-hidden',
        container: 'py-14 sm:py-18 lg:py-22 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(25rem,0.88fr)]',
        headline: 'mb-4 text-sm',
        title: 'text-[clamp(2.65rem,5vw,4rem)] leading-[1.08] tracking-[-0.045em]',
        description: 'mt-5 max-w-[34rem] text-base/8 sm:text-lg/8 break-words [overflow-wrap:anywhere]',
        footer: 'mt-8'
      }"
    >
      <template #top>
        <div class="hero-grid">
          <div class="hero-glow" />
        </div>
      </template>

      <template #title>
        {{ t('home.hero.titleBefore') }}<br>
        <span class="hero-title-line text-primary">{{ t('home.hero.titleAccent') }}</span>
      </template>

      <template #description>
        {{ t('home.hero.description') }}
      </template>

      <div class="hero-dashboard relative mx-auto w-full max-w-xl">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <p class="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              {{ t('home.hero.liveExperience') }}
            </p>
            <h2 class="mt-1.5 text-base font-semibold text-highlighted sm:text-lg">
              {{ t('home.hero.overview') }}
            </h2>
          </div>
          <UBadge
            :label="t('home.hero.sample')"
            color="primary"
            variant="subtle"
          />
        </div>

        <div class="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div class="hero-stat">
            <p>{{ t('home.hero.visitsToday') }}</p>
            <strong>12,846</strong>
            <span class="text-success">↑ 18.4%</span>
          </div>
          <div class="hero-stat">
            <p>LCP P75</p>
            <strong>1.82s</strong>
            <span class="text-success">{{ t('home.hero.good') }}</span>
          </div>
          <div class="hero-stat">
            <p>{{ t('home.hero.errorRate') }}</p>
            <strong>0.24%</strong>
            <span>{{ t('home.hero.past24h') }}</span>
          </div>
        </div>

        <div class="mt-6 space-y-4">
          <div
            v-for="metric in vitalMetrics"
            :key="metric.name"
          >
            <div class="mb-1.5 flex items-center gap-3 text-xs">
              <strong class="w-9 text-highlighted">{{ metric.name }}</strong>
              <span class="flex-1 text-muted">{{ metric.label }}</span>
              <span class="font-medium text-highlighted">{{ metric.value }}</span>
            </div>
            <div class="metric-bar">
              <span :style="{ width: metric.width }" />
            </div>
          </div>
        </div>
      </div>
    </UPageHero>

    <section class="home-section home-section--compact home-section--sdk">
      <UContainer>
        <div class="sdk-bridge">
          <div class="sdk-bridge__content">
            <header class="home-section__header mb-7!">
              <p class="home-section__eyebrow">
                {{ t('home.sdk.eyebrow') }}
              </p>
              <h2 class="home-section__title">
                {{ t('home.sdk.title') }}
              </h2>
              <p class="home-section__description">
                {{ t('home.sdk.description') }}
              </p>
            </header>

            <div class="sdk-feature-grid">
              <div
                v-for="feature in sdkFeatures"
                :key="feature.title"
                class="sdk-feature"
              >
                <span>
                  <UIcon
                    :name="feature.icon"
                    class="size-5"
                  />
                </span>
                <div>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
            </div>

            <div class="mt-7 flex flex-wrap gap-3">
              <UButton
                :label="t('home.sdk.guide')"
                :to="localePath('/sdk/installation')"
                trailing-icon="i-lucide-arrow-right"
              />
              <UButton
                :label="t('home.sdk.quickStart')"
                :to="localePath('/getting-started/quick-start')"
                color="neutral"
                variant="outline"
              />
            </div>
          </div>

          <div>
            <div class="code-window">
              <div class="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span class="size-2.5 rounded-full bg-red-400" />
                <span class="size-2.5 rounded-full bg-amber-300" />
                <span class="size-2.5 rounded-full bg-emerald-400" />
                <span class="ml-2 text-xs text-emerald-100/50">index.html</span>
              </div>
              <pre><code><span class="text-emerald-400">&lt;script</span>
  defer
  src="https://apm.noxussj.top/monitor.min.js"
  data-project-key="mk_your_project_key"
<span class="text-emerald-400">&gt;&lt;/script&gt;</span>

<span class="text-emerald-200/50">{{ t('home.sdk.codeComment') }}</span>
window.PulseWatch.track('signup_completed', {
  plan: 'free'
})</code></pre>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="home-section home-section--capabilities">
      <UContainer>
        <div class="capability-layout">
          <header class="home-section__header capability-layout__intro">
            <p class="home-section__eyebrow">
              {{ t('home.capabilities.eyebrow') }}
            </p>
            <h2 class="home-section__title">
              {{ t('home.capabilities.title') }}
            </h2>
            <p class="home-section__description">
              {{ t('home.capabilities.description') }}
            </p>
            <UButton
              :label="t('home.capabilities.all')"
              :to="localePath('/features/overview')"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-right"
              class="mt-7"
            />
          </header>

          <div class="capability-grid">
            <NuxtLink
              v-for="capability in capabilities"
              :key="capability.title"
              :to="capability.to"
              class="capability-card group"
            >
              <div class="capability-card__topline">
                <span class="capability-card__icon">
                  <UIcon
                    :name="capability.icon"
                    class="size-6"
                  />
                </span>
                <span class="capability-card__index">{{ capability.index }}</span>
              </div>
              <div class="capability-card__content">
                <h3>{{ capability.title }}</h3>
                <p>{{ capability.description }}</p>
                <span class="capability-card__link">
                  {{ t('home.capabilities.more') }}
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="home-section home-section--muted">
      <UContainer>
        <header class="home-section__header">
          <p class="home-section__eyebrow">
            {{ t('home.performance.eyebrow') }}
          </p>
          <h2 class="home-section__title">
            {{ t('home.performance.title') }}
          </h2>
          <p class="home-section__description">
            {{ t('home.performance.description') }}
          </p>
        </header>

        <div class="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)]">
          <div class="grid gap-px overflow-hidden rounded-2xl border border-default bg-default sm:grid-cols-2">
            <div
              v-for="group in performanceGroups"
              :key="group.metrics"
              class="performance-card"
            >
              <div class="flex items-center justify-between gap-4">
                <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <UIcon
                    :name="group.icon"
                    class="size-4"
                  />
                  {{ group.metrics }}
                </span>
                <span class="text-xs text-dimmed">{{ group.title }}</span>
              </div>
              <h3>{{ group.title }}</h3>
              <p>{{ group.description }}</p>
            </div>
          </div>

          <div class="optimization-card">
            <p class="text-xs font-semibold tracking-[0.14em] text-primary">
              {{ t('home.performance.workflow') }}
            </p>
            <h3 class="mt-3 text-xl font-semibold tracking-tight text-highlighted">
              {{ t('home.performance.workflowTitle') }}
            </h3>
            <div class="mt-8 space-y-0">
              <div
                v-for="(item, index) in workflow"
                :key="item.index"
                class="optimization-step"
              >
                <span>{{ item.index }}</span>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
                <div
                  v-if="index < workflow.length - 1"
                  class="optimization-step__line"
                />
              </div>
            </div>
            <UButton
              :label="t('home.performance.all')"
              :to="localePath('/features/performance')"
              color="primary"
              variant="soft"
              trailing-icon="i-lucide-arrow-right"
              class="mt-8"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <section class="home-closing">
      <UContainer>
        <div class="home-closing__inner">
          <div class="home-closing__content">
            <p class="home-section__eyebrow">
              {{ t('home.closing.eyebrow') }}
            </p>
            <h2>{{ t('home.closing.title') }}</h2>
            <p>
              {{ t('home.closing.description') }}
            </p>
          </div>
          <div class="home-closing__action">
            <UBadge
              :label="t('home.closing.quota')"
              icon="i-lucide-database"
              color="primary"
              variant="subtle"
            />
            <p>{{ t('home.closing.noCard') }}</p>
            <div class="flex flex-wrap justify-center gap-3 lg:justify-end">
              <UButton
                :label="t('home.closing.start')"
                :to="localePath('/getting-started/quick-start')"
                trailing-icon="i-lucide-arrow-right"
                size="lg"
              />
              <UButton
                :label="t('home.closing.pro')"
                :to="localePath('/membership')"
                color="neutral"
                variant="outline"
                size="lg"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
