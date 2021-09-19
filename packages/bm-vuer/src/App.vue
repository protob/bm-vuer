<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useClient } from 'villus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
const router = useRouter()

useHead({
  title: 'Bookmarks Vuer',
  meta: [{ name: 'description', content: 'Bookmarks Vuer' }],
})
useClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
})

const userStore = useUserStore()

if (typeof window !== 'undefined') {
  // TODO AUTH
  // const authToken = null
  // localStorage.authToken = authToken
  // if (localStorage.authToken) router.push({ path: '/collection' })
}
</script>

<template>
  <router-view />
</template>
