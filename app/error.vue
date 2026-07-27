<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useSeoMeta({
  title: '页面不存在',
  description: '没有找到你要访问的 PulseWatch 文档页面。'
})
</script>

<template>
  <UApp>
    <UError
      :error="error"
      redirect="/"
    />
  </UApp>
</template>
