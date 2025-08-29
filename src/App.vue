<script setup lang="ts">
  import { Toaster } from '@/components/ui/sonner'
  import 'vue-sonner/style.css'
</script>

<template>
  <main class="flex min-h-dvh grow mb-5">
    <Toaster />
    <div class="container mx-auto">
      <RouterView />
    </div>
  </main>
</template>
