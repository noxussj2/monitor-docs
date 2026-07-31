<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui-pro/runtime/components/PricingPlan.vue'

const adminConsoleUrl = 'https://apm.noxussj.top'
const deploymentModalOpen = ref(false)
const deploymentContactEmail = '632922356@qq.com'
const deploymentMailto = `mailto:${deploymentContactEmail}?subject=PulseWatch%20私有部署咨询`

const pricingPlanUi: PricingPlanProps['ui'] = {
  root: 'h-full flex flex-col',
  body: 'flex-1',
  footer: 'mt-auto min-h-28 justify-start',
  button: 'w-full',
  featureTitle: 'whitespace-normal'
}

const plans: PricingPlanProps[] = [
  {
    title: '免费版',
    description: '适合个人网站、内部工具和首次体验真实用户监控。',
    price: '¥0',
    billingPeriod: '/ 永久',
    features: [
      '可监控 1 个网站',
      '账号每月 200 MB 上下文 data 接收量',
      '账号每月 3000 次事件触发',
      '访问、性能、错误和事件监控',
      '浏览器 SDK 与 SPA 自动追踪',
      '基础趋势和环境分析'
    ],
    button: {
      label: '查看接入指南',
      to: '/getting-started/quick-start',
      color: 'neutral',
      variant: 'outline'
    },
    ui: pricingPlanUi
  },
  {
    title: 'PRO 版',
    description: '适合持续运营、需要监控更多网站、更高接收量和更高事件触发额度的产品。',
    price: '¥19.9',
    billingPeriod: '/ 月',
    badge: '推荐',
    highlight: true,
    features: [
      '可监控 10 个网站',
      '账号每月 1 GB 上下文 data 接收量',
      '账号每月 30000 次事件触发',
      '访问、性能、错误和事件监控',
      '浏览器 SDK 与 SPA 自动追踪',
      '基础趋势和环境分析',
      '管理端用户中心自助开通'
    ],
    button: {
      label: '进入管理端升级',
      icon: 'i-lucide-crown',
      to: adminConsoleUrl,
      target: '_blank'
    },
    terms: '在管理端用户中心扫码付款，备注登录邮箱并二次确认后立即开通',
    ui: pricingPlanUi
  },
  {
    title: '私有部署版',
    description: '提供现有系统源代码，并协助部署到你的服务器或私有云环境。',
    price: '¥199',
    billingPeriod: '/ 一次性',
    features: [
      '交付现有系统源代码',
      '协助部署到自有环境',
      '监控数据留存在自己手里',
      '适合内网和私有云场景',
      '部署完成后可长期自主使用'
    ],
    button: {
      label: '邮件咨询部署',
      icon: 'i-lucide-mail',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        deploymentModalOpen.value = true
      }
    },
    terms: '一次开通，包含源码交付与部署协助；业务功能调整不在交付范围内',
    ui: pricingPlanUi
  }
]

const faqs = [
  {
    label: '免费的 200 MB 上下文 data 是怎么计算的？',
    content: '免费账号默认拥有每个自然月 200 MB 上下文 data 接收量，PRO 账号为每个自然月 1 GB。它只统计埋点事件和错误事件最终落库的 data 字段，访问统计字段、性能指标数值和事件名等结构字段不计入。'
  },
  {
    label: '3000 次事件触发包含哪些数据？',
    content: '页面访问、业务事件、前端错误和性能指标四类被服务端成功接收的记录都会合并计入事件触发次数。免费账号每月 3000 次，PRO 账号每月 30000 次。'
  },
  {
    label: '当月额度用完后会发生什么？',
    content: '账号达到当月上下文 data 接收量或事件触发次数任一上限后，平台会停止接收账号下网站的新监控数据；已有历史数据、网站配置和 API Key 不会因此删除。升级 PRO 可以提升网站数量、上下文 data 接收量和事件次数额度。'
  },
  {
    label: '清空数据会恢复当月额度吗？',
    content: '不会。清空数据只删除历史记录和报表展示，不会返还当月已经使用的上下文 data 接收量或事件触发次数。额度会在下个自然月自动重置。'
  },
  {
    label: '现在会自动扣费吗？',
    content: '不会。免费版无需绑定付款方式，平台不会自动扣费，也不会因为超量产生未经确认的费用。PRO 为 19.9 元/月，需要你在管理端用户中心主动扫码付款并完成确认。'
  },
  {
    label: '怎么开通 PRO？',
    content: '注册或登录管理端后进入用户中心，点击“升级 PRO”，扫码付款时备注当前登录邮箱，并勾选风险确认、手动输入确认文本后提交。确认成功后账号会立即切换为 PRO。'
  },
  {
    label: '怎么减少额度消耗？',
    content: '只保留真正有价值的业务事件，避免重复上报；测试环境可以关闭自动访问采集或使用独立监控网站。SDK 也内置每分钟上报限制和重复错误抑制，减少异常流量。'
  }
]

useSeoMeta({
  title: '会员与接收量',
  description: '了解 PulseWatch 免费版、PRO 版和私有部署版的适用场景，以及每月接收量和事件触发规则。'
})
</script>

<template>
  <div>
    <UPageHero
      headline="会员与接收量"
      title="开通会员，覆盖更多业务场景"
      description="当站点访问增长、活动上线或产品线变多时，会员可以让监控覆盖更完整、数据留存更连续、问题定位更从容。把零散的异常和波动沉淀成长期可追踪的运营依据。"
      :links="[
        { label: '进入管理端开通', to: adminConsoleUrl, icon: 'i-lucide-crown', target: '_blank' },
        { label: '查看会员方案', to: '#plans', color: 'neutral', variant: 'outline' }
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
          label="适合长期运营与规模增长"
          color="primary"
          variant="subtle"
          size="lg"
        />
      </template>
    </UPageHero>

    <UContainer class="pb-20 sm:pb-24">
      <UPricingPlans
        id="plans"
        :plans="plans"
        class="mx-auto max-w-6xl items-stretch"
      />

      <div class="mt-16 grid gap-8 border-y border-default py-10 sm:grid-cols-3">
        <div>
          <UIcon
            name="i-lucide-calendar-range"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            账号自然月额度
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            上下文 data 和事件触发次数按北京时间自然月统计，新的月份重新开始累计。
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
            达到任一额度上限后停止接收新数据，不会因为超量产生未经确认的费用。
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
            清空历史数据不会恢复当月已使用额度，额度会在下个自然月重置。
          </p>
        </div>
      </div>
    </UContainer>

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
              当前免费、不会自动扣费。PRO 在管理端用户中心自助开通，扫码付款时必须备注当前登录邮箱。
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
      v-model:open="deploymentModalOpen"
      title="咨询私有部署版"
      description="请发送邮件说明你的服务器环境、域名和预计部署时间，我会协助完成现有系统部署。"
      :ui="{ content: 'sm:max-w-md' }"
    >
      <template #body>
        <div class="space-y-4">
          <div class="rounded-lg border border-default bg-elevated/60 p-4">
            <p class="text-xs text-muted">
              联系邮箱
            </p>
            <p class="mt-2 select-all text-lg font-semibold text-highlighted">
              {{ deploymentContactEmail }}
            </p>
          </div>

          <p class="text-sm leading-6 text-muted">
            私有部署版包含现有系统源码交付与部署协助，业务功能调整不在交付范围内。
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            label="关闭"
            color="neutral"
            variant="outline"
            @click="deploymentModalOpen = false"
          />
          <UButton
            label="发送邮件"
            icon="i-lucide-send"
            :to="deploymentMailto"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
