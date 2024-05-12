<template>
  <DefaultTheme.Layout />
</template>

<script setup>
import { useRouter } from 'vitepress'

import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue';

const router = useRouter()

watch(() => router.route.path, () => {
  resetRoute()
})

const resetRoute = () => {
  if (router.route.component) {
    return
  }

  if (/\/en\/(.*)/.test(router.route.path)) {
    router.go('/smserialport/en/')
    return
  }
}

resetRoute()
</script>
