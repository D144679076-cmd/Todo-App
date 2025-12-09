<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import type { AuthData } from '@/composables/lib/type'

const router = useRouter()
const route = useRoute()
const { setAuth } = useAuth()

onMounted(() => {
  try {
    // Get auth data from URL query parameter
    const dataParam = route.query.data as string

    if (dataParam) {
      const authData: AuthData = JSON.parse(decodeURIComponent(dataParam))

      // Store auth data
      setAuth(authData)

      // Redirect to home
      window.location.href = '/'
    } else {
      // No data, check for error
      const error = route.query.error as string
      console.error('OAuth callback error:', error)
      router.push('/dang-nhap?error=' + (error || 'unknown'))
    }
  } catch (err) {
    console.error('Error processing OAuth callback:', err)
    router.push('/dang-nhap?error=parse_error')
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-5xl text-cyan-400 mb-4"></i>
      <p class="text-white text-xl">Completing sign in...</p>
    </div>
  </div>
</template>
