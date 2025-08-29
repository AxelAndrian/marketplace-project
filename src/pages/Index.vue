<script setup lang="ts">
import AuthLayout from '@/components/layouts/AuthLayout.vue';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
</script>

<template>
  <AuthLayout>
    <div class="space-y-2.5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div class="flex justify-between items-center">
        <h2
          class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          Dashboard
        </h2>
      </div>
    </div>
  </AuthLayout>
</template>
