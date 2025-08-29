<script setup lang="ts">
import AuthLayout from '@/components/layouts/AuthLayout.vue';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
</script>

<template>
  <AuthLayout>
    <div class="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <RouterLink to="/cart">Cart</RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>List</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div class="flex justify-between items-center">
        <h2
          class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          Cart
        </h2>
      </div>
    </div>
  </AuthLayout>
</template>
