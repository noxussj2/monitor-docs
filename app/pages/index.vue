<script setup lang="ts">
const capabilities = [
  {
    index: '01',
    icon: 'i-lucide-chart-no-axes-combined',
    title: '访问与用户洞察',
    description: '从访问趋势、来源、地域和设备，理解真实用户如何使用产品。',
    to: '/features/analytics'
  },
  {
    index: '02',
    icon: 'i-lucide-gauge',
    title: '真实用户性能',
    description: '持续观察核心体验指标，发现加载慢、交互卡顿和页面跳动。',
    to: '/features/performance'
  },
  {
    index: '03',
    icon: 'i-lucide-bug',
    title: '前端错误监控',
    description: '自动捕获运行时、Promise、资源和接口错误，还原问题现场。',
    to: '/features/errors'
  },
  {
    index: '04',
    icon: 'i-lucide-mouse-pointer-click',
    title: '业务事件追踪',
    description: '记录注册、购买和搜索等关键动作，连接技术体验与业务结果。',
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
    description: '判断页面何时给出反馈，以及主要内容什么时候真正可见。'
  },
  {
    icon: 'i-lucide-mouse-pointer-2',
    metrics: 'INP / TBT',
    title: '交互响应',
    description: '发现主线程阻塞和交互卡顿，定位过重的 JavaScript。'
  },
  {
    icon: 'i-lucide-layout-template',
    metrics: 'CLS',
    title: '视觉稳定',
    description: '识别图片、广告和异步内容造成的意外布局移动。'
  },
  {
    icon: 'i-lucide-server',
    metrics: 'TTFB',
    title: '服务响应',
    description: '分辨问题来自服务端、网络链路，还是浏览器渲染。'
  }
]

const workflow = [
  {
    index: '01',
    title: '接入',
    description: '创建项目，复制 SDK 代码。'
  },
  {
    index: '02',
    title: '观察',
    description: '按页面与环境确认影响范围。'
  },
  {
    index: '03',
    title: '优化',
    description: '修复问题，用新数据验证结果。'
  }
]

const sdkFeatures = [
  {
    icon: 'i-lucide-zap',
    title: '自动采集',
    description: '访问、性能与错误无需逐项编写监听代码。'
  },
  {
    icon: 'i-lucide-route',
    title: 'SPA 路由识别',
    description: '路由变化时自动建立新的页面体验上下文。'
  },
  {
    icon: 'i-lucide-shield-check',
    title: '隐私优先',
    description: '默认不采集输入值、密码、Cookie 和页面正文。'
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
      headline="真实用户监控 · RUM"
      :links="[
        { label: '5 分钟快速接入', to: '/getting-started/quick-start', icon: 'i-lucide-rocket' },
        { label: '阅读 SDK 文档', to: '/sdk/installation', color: 'neutral', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
      ]"
      :ui="{
        root: 'overflow-hidden',
        container: 'py-14 sm:py-18 lg:py-22 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(25rem,0.88fr)]',
        headline: 'mb-4 text-sm',
        title: 'text-[clamp(2.65rem,5vw,4rem)] leading-[1.08] tracking-[-0.045em]',
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
        关注每一次访问，<br>
        <span class="hero-title-line text-primary">改善 Web 应用体验</span>
      </template>

      <template #description>
        用一段轻量 SDK 统一采集真实访问、核心性能指标、前端错误与业务事件。从发现问题到验证优化，每一步都有真实用户数据作为依据。
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
            label="示例 · 实时视图"
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

    <section class="home-section home-section--compact home-section--sdk">
      <UContainer>
        <div class="sdk-bridge">
          <div class="sdk-bridge__content">
            <header class="home-section__header mb-7!">
              <p class="home-section__eyebrow">
                5 分钟接入
              </p>
              <h2 class="home-section__title">
                一段代码，自动开始采集
              </h2>
              <p class="home-section__description">
                复制代码并替换项目 Key，访问、性能与错误数据就会自动进入平台，无需逐项配置监听器。
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
                label="查看完整 SDK 指南"
                to="/sdk/installation"
                trailing-icon="i-lucide-arrow-right"
              />
              <UButton
                label="5 分钟快速接入"
                to="/getting-started/quick-start"
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
  src="https://your-monitor.com/monitor.min.js"
  data-project-key="mk_your_project_key"
<span class="text-emerald-400">&gt;&lt;/script&gt;</span>

<span class="text-emerald-200/50">// 记录一个关键业务事件</span>
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
              平台能力
            </p>
            <h2 class="home-section__title">
              四类体验信号，拼出用户真实经历
            </h2>
            <p class="home-section__description">
              把访问行为、性能、错误与业务事件串进同一条用户上下文，既能看见发生了什么，也能判断影响了谁、应该先处理什么。
            </p>
            <UButton
              label="查看全部平台能力"
              to="/features/overview"
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
                  了解更多
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
            性能指标
          </p>
          <h2 class="home-section__title">
            从指标变化，找到明确的优化方向
          </h2>
          <p class="home-section__description">
            把“页面很慢”拆成加载、交互、稳定性和服务响应，判断应该优化图片、JavaScript、布局，还是服务端链路。
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
              优化闭环
            </p>
            <h3 class="mt-3 text-xl font-semibold tracking-tight text-highlighted">
              用数据闭环，验证每一次优化
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
              免费开始
            </p>
            <h2>从一个真实项目开始，看见用户正在经历什么</h2>
            <p>
              免费版可监控 1 个网站，每个项目每月包含 1 GB 免费额度。接入 SDK 后即可查看真实访问、性能与错误数据，再按实际需要决定是否升级 PRO。
            </p>
          </div>
          <div class="home-closing__action">
            <UBadge
              label="1 GB / 项目 / 月"
              icon="i-lucide-database"
              color="primary"
              variant="subtle"
            />
            <p>无需绑定付款方式 · 不会自动扣费</p>
            <div class="flex flex-wrap justify-center gap-3 lg:justify-end">
              <UButton
                label="5 分钟开始接入"
                to="/getting-started/quick-start"
                trailing-icon="i-lucide-arrow-right"
                size="lg"
              />
              <UButton
                label="查看 PRO 方案"
                to="/membership"
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
