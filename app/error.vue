<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value
  }
}))

useSeoMeta({
  title: () => t('errors.title'),
  description: () => t('errors.description')
})
</script>

<template>
  <UApp>
    <UError
      :error="error"
      :redirect="localePath('/')"
    />
  </UApp>
</template>
