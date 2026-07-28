<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui-pro/runtime/components/PricingPlan.vue'

const plans: PricingPlanProps[] = [
  {
    title: '免费版',
    description: '适合个人网站、内部工具和首次体验真实用户监控。',
    price: '¥0',
    billingPeriod: '/ 永久',
    features: [
      '可监控 1 个网站',
      '每个网站每月 1 GB 数据额度',
      '访问、性能、错误和事件监控',
      '浏览器 SDK 与 SPA 自动追踪',
      '基础趋势和环境分析'
    ],
    button: {
      label: '查看接入指南',
      to: '/getting-started/quick-start',
      color: 'neutral',
      variant: 'outline'
    }
  },
  {
    title: 'PRO 版',
    description: '适合持续运营、需要监控更多网站和导出数据报表的产品。',
    price: '即将开放',
    badge: '推荐',
    highlight: true,
    features: [
      '更高的网站月度数据额度',
      '可监控更多网站',
      '数据报表下载'
    ],
    button: {
      label: '付费功能准备中',
      disabled: true
    },
    terms: '正式价格、额度和开通时间以后续公告为准'
  }
]

const faqs = [
  {
    label: '免费的 1 GB 是怎么计算的？',
    content: '当前每个监控网站默认拥有每个自然月 1 GB 监控数据额度。页面访问、性能、错误和自定义事件四类已接收数据按实际记录大小累计，次月重新开始计算。'
  },
  {
    label: '当月额度用完后会发生什么？',
    content: '平台会停止接收该网站新的监控数据，避免产生不可预期费用；网站配置和历史数据不会因此删除。进入下个自然月或未来升级额度后可以继续接收。'
  },
  {
    label: '现在会自动扣费吗？',
    content: '不会。付费能力尚未开放，当前没有自动扣费或隐藏费用。未来上线付费功能时，会先展示明确的价格、额度、周期和确认步骤。'
  },
  {
    label: '未来准备如何付费？',
    content: 'PRO 版将围绕三个能力定价：更高的网站月度数据额度、更多可监控网站数量，以及数据报表下载。计划支持按月或按年订阅，最终价格和规则以上线公告和购买页面为准。'
  },
  {
    label: '怎么减少额度消耗？',
    content: '只保留真正有价值的业务事件，避免重复上报；测试环境可以关闭自动访问采集或使用独立监控网站。SDK 也内置每分钟上报限制和重复错误抑制，减少异常流量。'
  }
]

useSeoMeta({
  title: '会员与数据额度',
  description: '了解 PulseWatch 免费版 1 个监控网站、每月 1 GB 数据额度，以及未来的 PRO 付费方案。'
})
</script>

<template>
  <div>
    <UPageHero
      headline="会员与数据额度"
      title="先免费验证价值，再按需要升级"
      description="免费版可监控 1 个网站，每个网站每月默认享有 1 GB 监控数据额度。付费能力尚未开放，不会自动扣费；未来可升级 PRO，获得更高数据额度、更多监控网站和数据报表下载能力。"
      :links="[
        { label: '免费开始接入', to: '/getting-started/quick-start', icon: 'i-lucide-rocket' },
        { label: '了解额度规则', to: '/account/quota', color: 'neutral', variant: 'outline' }
      ]"
      :ui="{
        container: 'py-16 sm:py-20 lg:py-24',
        headline: 'mb-4',
        title: 'mx-auto text-4xl sm:text-5xl leading-[1.15] tracking-[-0.04em] sm:whitespace-nowrap',
        description: 'mx-auto mt-5 max-w-2xl text-base/8 sm:text-lg/8',
        footer: 'mt-8'
      }"
    >
      <template #headline>
        <UBadge
          label="当前免费 · 无自动扣费"
          color="primary"
          variant="subtle"
          size="lg"
        />
      </template>
    </UPageHero>

    <UContainer class="pb-20 sm:pb-24">
      <UPricingPlans
        :plans="plans"
        class="mx-auto max-w-5xl items-stretch"
      />

      <div class="mt-16 grid gap-8 border-y border-default py-10 sm:grid-cols-3">
        <div>
          <UIcon
            name="i-lucide-calendar-range"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            自然月额度
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            用量按北京时间自然月统计，新的月份重新开始累计。
          </p>
        </div>
        <div>
          <UIcon
            name="i-lucide-shield-check"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            费用可控
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            达到额度后停止接收新数据，不会因为超量产生未经确认的费用。
          </p>
        </div>
        <div>
          <UIcon
            name="i-lucide-database"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            数据不被清空
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            额度耗尽不会删除网站配置和已有历史记录，只暂停新数据写入。
          </p>
        </div>
      </div>
    </UContainer>

    <section class="home-section home-section--muted">
      <UContainer>
        <header class="home-section__header">
          <p class="home-section__eyebrow">
            付费路径
          </p>
          <h2 class="home-section__title">
            升级 PRO，过程简单透明
          </h2>
          <p class="home-section__description">
            付费能力上线后，可以在控制台查看用量、确认价格与周期，再主动完成升级。下面是计划中的流程，不代表已经开放交易。
          </p>
        </header>

        <div class="grid gap-px overflow-hidden rounded-2xl border border-default bg-default sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, index) in ['查看本月用量', '选择 PRO 版本', '确认价格与周期', '付款后即时扩容']"
            :key="step"
            class="min-h-32 bg-default p-6"
          >
            <span class="text-xs font-bold text-primary">0{{ index + 1 }}</span>
            <h3 class="mt-4 text-lg font-semibold text-highlighted">
              {{ step }}
            </h3>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="home-section">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <header class="home-section__header mb-0!">
            <p class="home-section__eyebrow">
              常见问题
            </p>
            <h2 class="home-section__title">
              关于额度与付费
            </h2>
            <p class="home-section__description">
              当前免费、不会自动扣费。正式开放 PRO 前，我们会先公布完整价格和规则。
            </p>
          </header>
          <UAccordion
            :items="faqs"
            class="w-full"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
