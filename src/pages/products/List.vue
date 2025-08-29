<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { Plus } from 'lucide-vue-next';
    
    import AuthLayout from '@/components/layouts/AuthLayout.vue';

    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb'
    import { Button } from '@/components/ui/button';

    import dataTable from './_components/data-table.vue';
    import { columns } from './_components/column';

    import { useProductStore } from '@/stores/products';

    const productStore = useProductStore();
    const isLoading = ref(false);

    const getProducts = async () => {
        isLoading.value = true;
        try {
            await productStore.fetchProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(async () => {
        await getProducts();
    });

</script>

<template>
    <AuthLayout>
        <div class="space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink as-child>
                            <RouterLink to="/products">Products</RouterLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div class="flex justify-between items-center">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Products</h2>
                <Button as-child>
                    <RouterLink to="/products/create" class="inline-flex justify-center items-center gap-2">
                        <Plus :size="16" />
                        Add Product
                    </RouterLink>
                </Button>
            </div>
        </div>
        <dataTable :columns="columns" :data="productStore.products" :loading="isLoading" />
    </AuthLayout>
</template>