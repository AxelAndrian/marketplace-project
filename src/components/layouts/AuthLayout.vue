<script setup lang="ts">
    import Header from "@/components/ui/navigation/Header.vue"
</script>

<template>
    <section class="relative w-full space-y-6">
        <Header />
        <slot />
    </section>    
</template>