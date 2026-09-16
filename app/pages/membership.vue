<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui-pro/runtime/components/PricingPlan.vue'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const adminConsoleUrl = 'https://apm.noxussj.top'
const deploymentModalOpen = ref(false)
const deploymentContactEmail = '632922356@qq.com'
const deploymentMailto = `mailto:${deploymentContactEmail}?subject=TraceVista%20私有部署咨询`

const pricingPlanUi: PricingPlanProps['ui'] = {
  root: 'h-full flex flex-col',
  body: 'flex-1',
  footer: 'mt-auto min-h-28 justify-start',
  button: 'w-full',
  featureTitle: 'whitespace-normal'
}

function translatedList(key: string) {
  return (tm(key) as unknown[]).map(item => rt(item as string))
}

const plans = computed<PricingPlanProps[]>(() => [
  {
    title: t('membership.free.title'),
    description: t('membership.free.description'),
    price: '¥0',
    billingPeriod: t('membership.free.period'),
    features: translatedList('membership.free.features'),
    button: {
      label: t('membership.free.button'),
      to: localePath('/getting-started/quick-start'),
      color: 'neutral',
      variant: 'outline'
    },
    ui: pricingPlanUi
  },
  {
    title: t('membership.pro.title'),
    description: t('membership.pro.description'),
    price: '¥19.9',
    billingPeriod: t('membership.pro.period'),
    badge: t('membership.pro.badge'),
    highlight: true,
    features: translatedList('membership.pro.features'),
    button: {
      label: t('membership.pro.button'),
      icon: 'i-lucide-crown',
      to: adminConsoleUrl,
      target: '_blank'
    },
    terms: t('membership.pro.terms'),
    ui: pricingPlanUi
  },
  {
    title: t('membership.private.title'),
    description: t('membership.private.description'),
    price: '¥199',
    billingPeriod: t('membership.private.period'),
    features: translatedList('membership.private.features'),
    button: {
      label: t('membership.private.button'),
      icon: 'i-lucide-mail',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        deploymentModalOpen.value = true
      }
    },
    terms: t('membership.private.terms'),
    ui: pricingPlanUi
  }
])

const faqs = computed(() => (tm('membership.faq.items') as Array<{ label: unknown, content: unknown }>).map(item => ({
  label: rt(item.label as string),
  content: rt(item.content as string)
})))

useSeoMeta({
  title: () => t('membership.seoTitle'),
  description: () => t('membership.seoDescription')
})
</script>

<template>
  <div>
    <UPageHero
      :headline="t('membership.headline')"
      :title="t('membership.title')"
      :description="t('membership.description')"
      :links="[
        { label: t('membership.open'), to: adminConsoleUrl, icon: 'i-lucide-crown', target: '_blank' },
        { label: t('membership.viewPlans'), to: '#plans', color: 'neutral', variant: 'outline' }
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
          :label="t('membership.badge')"
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
            {{ t('membership.facts.monthlyTitle') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            {{ t('membership.facts.monthlyDescription') }}
          </p>
        </div>
        <div>
          <UIcon
            name="i-lucide-shield-check"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            {{ t('membership.facts.controlledTitle') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            {{ t('membership.facts.controlledDescription') }}
          </p>
        </div>
        <div>
          <UIcon
            name="i-lucide-database"
            class="size-6 text-primary"
          />
          <h2 class="mt-3 font-semibold text-highlighted">
            {{ t('membership.facts.resetTitle') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted">
            {{ t('membership.facts.resetDescription') }}
          </p>
        </div>
      </div>
    </UContainer>

    <section class="home-section">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <header class="home-section__header mb-0!">
            <p class="home-section__eyebrow">
              {{ t('membership.faq.eyebrow') }}
            </p>
            <h2 class="home-section__title">
              {{ t('membership.faq.title') }}
            </h2>
            <p class="home-section__description">
              {{ t('membership.faq.description') }}
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
      :title="t('membership.modal.title')"
      :description="t('membership.modal.description')"
      :ui="{ content: 'sm:max-w-md' }"
    >
      <template #body>
        <div class="space-y-4">
          <div class="rounded-lg border border-default bg-elevated/60 p-4">
            <p class="text-xs text-muted">
              {{ t('membership.modal.email') }}
            </p>
            <p class="mt-2 select-all text-lg font-semibold text-highlighted">
              {{ deploymentContactEmail }}
            </p>
          </div>

          <p class="text-sm leading-6 text-muted">
            {{ t('membership.modal.note') }}
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <UButton
            :label="t('membership.modal.close')"
            color="neutral"
            variant="outline"
            @click="deploymentModalOpen = false"
          />
          <UButton
            :label="t('membership.modal.send')"
            icon="i-lucide-send"
            :to="deploymentMailto"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
