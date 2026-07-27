<script setup lang="ts">
const capabilities = [
  {
    icon: 'i-lucide-chart-no-axes-combined',
    title: '访问与用户洞察',
    description: '看清 PV、UV、访问趋势、来源、地域、设备和热门页面，理解真实用户如何使用产品。',
    to: '/features/analytics'
  },
  {
    icon: 'i-lucide-gauge',
    title: '真实用户性能',
    description: '持续采集核心体验指标，从用户现场发现加载慢、交互卡顿和页面跳动。',
    to: '/features/performance'
  },
  {
    icon: 'i-lucide-bug',
    title: '前端错误监控',
    description: '自动捕获 JavaScript、Promise、资源和接口错误，通过上下文还原问题现场。',
    to: '/features/errors'
  },
  {
    icon: 'i-lucide-mouse-pointer-click',
    title: '业务事件追踪',
    description: '记录注册、购买、搜索等关键动作，把技术体验和业务结果放在一起判断。',
    to: '/features/analytics'
  }
]

const vitalMetrics = [
  { name: 'LCP', label: '主要内容出现速度', value: '≤ 2.5s', width: '82%' },
  { name: 'INP', label: '交互响应速度', value: '≤ 200ms', width: '74%' },
  { name: 'CLS', label: '页面视觉稳定性', value: '≤ 0.1', width: '90%' },
  { name: 'TTFB', label: '服务器首字节速度', value: '越低越好', width: '68%' }
]

const performanceGroups = [
  {
    icon: 'i-lucide-image',
    metrics: 'LCP / FCP',
    title: '内容出现',
    description: '判断页面是否尽快给出反馈，以及主要内容什么时候真正可见。'
  },
  {
    icon: 'i-lucide-mouse-pointer-2',
    metrics: 'INP / TBT',
    title: '交互响应',
    description: '发现主线程阻塞、点击迟钝和输入卡顿，定位过重的 JavaScript。'
  },
  {
    icon: 'i-lucide-layout-template',
    metrics: 'CLS',
    title: '视觉稳定',
    description: '识别图片、广告或异步内容造成的意外布局移动。'
  },
  {
    icon: 'i-lucide-server',
    metrics: 'TTFB',
    title: '服务响应',
    description: '分辨慢在服务端、网络链路，还是浏览器渲染阶段。'
  }
]

const workflow = [
  {
    index: '01',
    title: '接入',
    description: '创建项目，复制一段 Script。'
  },
  {
    index: '02',
    title: '观察',
    description: '按页面和环境判断影响范围。'
  },
  {
    index: '03',
    title: '优化',
    description: '修复问题，用真实数据验证结果。'
  }
]

const sdkFeatures = [
  {
    icon: 'i-lucide-zap',
    title: '自动采集',
    description: '无需为每个性能指标编写监听代码。'
  },
  {
    icon: 'i-lucide-route',
    title: 'SPA 路由识别',
    description: '路由变化时自动建立新的页面访问上下文。'
  },
  {
    icon: 'i-lucide-shield-check',
    title: '隐私优先',
    description: '不采集输入值、密码、Cookie 或页面正文。'
  }
]

useSeoMeta({
  title: 'Web 应用性能与用户体验监控平台',
  description: 'PulseWatch 帮助团队持续监控真实用户访问、Web 性能、前端错误和关键业务事件。'
})
</script>

<template>
  <div>
    <UPageHero
      orientation="horizontal"
      headline="真实用户监控 · Real User Monitoring"
      :links="[
        { label: '5 分钟快速接入', to: '/getting-started/quick-start', icon: 'i-lucide-rocket' },
        { label: '阅读 SDK 文档', to: '/sdk/installation', color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
      ]"
      :ui="{
        root: 'overflow-hidden',
        container: 'py-16 sm:py-20 lg:py-24 gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.9fr)]',
        headline: 'mb-4 text-sm',
        title: 'max-w-[12ch] text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.08] tracking-[-0.045em] text-balance',
        description: 'mt-5 max-w-xl text-base/8 sm:text-lg/8',
        footer: 'mt-8'
      }"
    >
      <template #top>
        <div class="hero-grid">
          <div class="hero-glow" />
        </div>
      </template>

      <template #title>
        看见每一次访问，<br>
        <span class="text-primary">让体验优化有据可循</span>
      </template>

      <template #description>
        一段轻量 SDK，统一采集真实访问、核心性能指标、前端错误与业务事件。从发现问题、定位影响，到验证优化结果，全部基于真实用户数据。
      </template>

      <div class="hero-dashboard relative mx-auto w-full max-w-xl">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <p class="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              Live experience
            </p>
            <h2 class="mt-1.5 text-base font-semibold text-highlighted sm:text-lg">
              真实用户体验概览
            </h2>
          </div>
          <UBadge
            label="示例数据"
            color="primary"
            variant="subtle"
          />
        </div>

        <div class="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div class="hero-stat">
            <p>今日访问</p>
            <strong>12,846</strong>
            <span class="text-success">↑ 18.4%</span>
          </div>
          <div class="hero-stat">
            <p>LCP P75</p>
            <strong>1.82s</strong>
            <span class="text-success">体验良好</span>
          </div>
          <div class="hero-stat">
            <p>错误率</p>
            <strong>0.24%</strong>
            <span>过去 24h</span>
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

    <section class="home-section">
      <UContainer>
        <header class="home-section__header">
          <p class="home-section__eyebrow">
            平台能力
          </p>
          <h2 class="home-section__title">
            把体验信号，变成可行动的答案
          </h2>
          <p class="home-section__description">
            PulseWatch 关注用户真实经历了什么，再按项目、页面和环境组织数据。你看到的不只是图表，而是问题发生在哪里、影响了谁、应该先处理什么。
          </p>
        </header>

        <div class="capability-grid">
          <NuxtLink
            v-for="capability in capabilities"
            :key="capability.title"
            :to="capability.to"
            class="capability-card group"
          >
            <span class="capability-card__icon">
              <UIcon
                :name="capability.icon"
                class="size-6"
              />
            </span>
            <h3>{{ capability.title }}</h3>
            <p>{{ capability.description }}</p>
            <span class="capability-card__link">
              了解更多
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <section class="home-section home-section--muted">
      <UContainer>
        <header class="home-section__header">
          <p class="home-section__eyebrow">
            性能指标
          </p>
          <h2 class="home-section__title">
            每一个指标，都对应一个优化方向
          </h2>
          <p class="home-section__description">
            把“页面很慢”拆成加载、交互、稳定性和服务响应，才能判断应该优化图片、JavaScript、布局，还是服务端链路。
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
            <p class="text-xs font-semibold tracking-[0.16em] text-emerald-300 uppercase">
              Optimization loop
            </p>
            <h3 class="mt-3 text-2xl font-semibold tracking-tight text-white">
              数据形成闭环，优化才有结果
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
              label="理解全部性能指标"
              to="/features/performance"
              color="neutral"
              variant="soft"
              trailing-icon="i-lucide-arrow-right"
              class="mt-8"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <section class="home-section">
      <UContainer>
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <header class="home-section__header mb-8!">
              <p class="home-section__eyebrow">
                浏览器 SDK
              </p>
              <h2 class="home-section__title">
                一段代码，自动开始采集
              </h2>
              <p class="home-section__description">
                Script 标签方式不依赖框架，适用于原生网站、Vue、Nuxt、React 和其他 SPA。
              </p>
            </header>

            <div class="space-y-5">
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

            <UButton
              label="查看完整 SDK 指南"
              to="/sdk/installation"
              trailing-icon="i-lucide-arrow-right"
              class="mt-8"
            />
          </div>

          <div class="code-window">
            <div class="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span class="size-2.5 rounded-full bg-red-400" />
              <span class="size-2.5 rounded-full bg-amber-300" />
              <span class="size-2.5 rounded-full bg-emerald-400" />
              <span class="ml-2 text-xs text-emerald-100/50">index.html</span>
            </div>
            <pre><code><span class="text-emerald-400">&lt;script</span>
  defer
  src="https://your-monitor.com/monitor.min.js"
  data-project-key="mk_your_project_key"
<span class="text-emerald-400">&gt;&lt;/script&gt;</span>

<span class="text-emerald-200/50">// 记录一个关键业务事件</span>
window.PulseWatch.track('signup_completed', {
  plan: 'free'
})</code></pre>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="pb-20 sm:pb-24">
      <UContainer>
        <UPageCTA
          title="每月 1 GB 免费额度，先跑起来"
          description="创建项目、接入真实站点并开始观察。后续需要更多数据额度时，再升级到 PRO。"
          variant="subtle"
          :links="[
            { label: '查看会员与额度', to: '/membership', icon: 'i-lucide-crown' },
            { label: '开始接入', to: '/getting-started/quick-start', color: 'neutral', variant: 'outline' }
          ]"
          :ui="{
            container: 'py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-12',
            title: 'max-w-xl text-2xl sm:text-3xl leading-tight',
            description: 'mt-4 max-w-2xl text-base/7',
            links: 'lg:justify-end'
          }"
        />
      </UContainer>
    </section>
  </div>
</template>
