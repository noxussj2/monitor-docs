<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui-pro/runtime/components/PricingPlan.vue'

const contactModalOpen = ref(false)
const wechatQrCodeSrc = '/wechat-qrcode.svg'

const plans: PricingPlanProps[] = [
  {
    title: '免费版',
    description: '适合个人网站、内部工具和首次体验真实用户监控。',
    price: '¥0',
    billingPeriod: '/ 永久',
    features: [
      '可监控 1 个网站',
      '每个网站每月 1 GB 接收量',
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
    price: '联系开通',
    badge: '推荐',
    highlight: true,
    features: [
      '更高的网站月度接收量',
      '可监控更多网站',
      '数据报表下载'
    ],
    button: {
      label: '联系我开通会员',
      icon: 'i-lucide-message-circle',
      onClick: () => {
        contactModalOpen.value = true
      }
    },
    terms: '扫码添加微信，确认账号和需求后人工开通'
  }
]

const faqs = [
  {
    label: '免费的 1 GB 接收量是怎么计算的？',
    content: '当前每个监控网站默认拥有每个自然月 1 GB 免费接收量。页面访问、性能、错误和自定义事件四类被服务端接收的数据，都会按实际大小累计，次月重新开始计算。'
  },
  {
    label: '当月接收量用完后会发生什么？',
    content: '平台会停止接收该网站新的监控数据，避免产生不可预期费用；网站配置和历史数据不会因此删除。进入下个自然月或升级更高接收量后可以继续接收。'
  },
  {
    label: '清空数据会恢复当月接收量吗？',
    content: '不会。清空数据只删除历史记录和报表展示，不会返还当月已经接收的数据量。每月接收量会在下个自然月自动重置。'
  },
  {
    label: '现在会自动扣费吗？',
    content: '不会。当前采用人工联系开通方式，不会自动扣费，也不会产生隐藏费用。确认价格、接收量和周期后，再由你主动完成付款。'
  },
  {
    label: '怎么开通 PRO？',
    content: '点击“联系我开通会员”并扫码添加微信，说明你的注册邮箱、需要监控的网站数量和预计月度接收量。确认付款后，将人工为账号开通 PRO 权益。'
  },
  {
    label: '怎么减少额度消耗？',
    content: '只保留真正有价值的业务事件，避免重复上报；测试环境可以关闭自动访问采集或使用独立监控网站。SDK 也内置每分钟上报限制和重复错误抑制，减少异常流量。'
  }
]

useSeoMeta({
  title: '会员与接收量',
  description: '了解 PulseWatch 免费版 1 个监控网站、每月 1 GB 接收量，以及 PRO 付费方案。'
})
</script>

<template>
  <div>
    <UPageHero
      headline="会员与接收量"
      title="先免费验证价值，再按需要升级"
      description="免费版可监控 1 个网站，每个网站每月默认享有 1 GB 接收量。接收量按服务端实际接收的数据大小累计，手动清空历史数据不会返还当月接收量；需要更高接收量、更多监控网站或数据报表下载时，可以联系人工开通 PRO。"
      :links="[
        { label: '免费开始接入', to: '/getting-started/quick-start', icon: 'i-lucide-rocket' },
        { label: '了解接收量规则', to: '/account/quota', color: 'neutral', variant: 'outline' }
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
          label="当前免费 · PRO 可联系开通"
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
            自然月接收量
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            接收量按北京时间自然月统计，新的月份重新开始累计。
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
            达到接收量上限后停止接收新数据，不会因为超量产生未经确认的费用。
          </p>
        </div>
        <div>
          <UIcon
            name="i-lucide-database"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            重置不返还
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            清空历史数据不会恢复当月已使用接收量，接收量会在下个自然月重置。
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
            你可以先在控制台查看本月接收量，再联系确认适合的接收量和周期。付款确认后，将为你的账号人工开通 PRO 权益。
          </p>
        </header>

        <div class="grid gap-px overflow-hidden rounded-2xl border border-default bg-default sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, index) in ['查看本月接收量', '选择 PRO 版本', '确认价格与周期', '付款后提升接收量']"
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
              当前免费、不会自动扣费。PRO 采用人工确认后开通，价格、接收量和周期会在付款前说明清楚。
            </p>
          </header>
          <UAccordion
            :items="faqs"
            class="w-full"
          />
        </div>
      </UContainer>
    </section>

    <UModal
      v-model:open="contactModalOpen"
      title="联系开通 PRO 会员"
      description="扫码添加微信，发送你的注册邮箱和需要开通的接收量。"
      :ui="{ content: 'sm:max-w-md' }"
    >
      <template #body>
        <div class="flex flex-col items-center text-center">
          <div class="rounded-lg border border-default bg-default p-4">
            <img
              :src="wechatQrCodeSrc"
              alt="微信联系二维码"
              class="size-64"
            >
          </div>
          <p class="mt-5 text-sm leading-6 text-muted">
            添加后请备注 PulseWatch PRO，并发送注册邮箱、需要监控的网站数量和预计月度接收量。
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end">
          <UButton
            label="关闭"
            color="neutral"
            variant="outline"
            @click="contactModalOpen = false"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
