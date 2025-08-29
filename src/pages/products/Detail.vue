<script setup lang="ts">
    import { toast } from 'vue-sonner';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import AuthLayout from '@/components/layouts/AuthLayout.vue';

    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb'
    import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
    import { Textarea } from '@/components/ui/textarea';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Label } from '@/components/ui/label';

    import { useProductStore } from '@/stores/products';

    const isLoading = ref(false);

    const productStore = useProductStore();
    const router = useRouter();
    const route = useRoute();

    const getProduct = async () => {
        isLoading.value = true;
        try {
            await productStore.fetchProduct(route.params.id as string);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast("Error", {
                description: "There was an issue fetching the product details.",
                position: 'top-right',
            });
            router.push({ path: '/products' });
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(async () => {
        await getProduct();
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
                        <BreadcrumbPage>Detail</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle class="text-2xl font-semibold">Detail Product</CardTitle>
                </CardHeader>
                <form>
                    <CardContent class="grid grid-cols-2 gap-6">
                        <div class="space-y-1.5">
                            <Label>Title</Label>
                            <Input type="text" placeholder="Input Title" :value="productStore.product.title || '-'" disabled />
                        </div>
                        <div class="space-y-1.5">
                            <Label>Price</Label>
                            <Input type="number" placeholder="Input Price" :value="productStore.product.price || 0" disabled />
                        </div>
                        <div class="space-y-1.5">
                            <Label>Category</Label>
                            <Input type="text" placeholder="Input Category" :value="productStore.product.category || '-'" disabled />
                        </div>
                        <div class="space-y-1.5">
                            <Label>Image</Label>
                            <Input type="text" placeholder="Input Image" :value="productStore.product.image || '-'" disabled />
                        </div>
                        <div class="col-span-2 space-y-1.5">
                            <Label>Description</Label>
                            <Textarea placeholder="Input Description" :value="productStore.product.description || '-'" disabled />
                        </div>
                    </CardContent>
                    <CardFooter class="flex justify-end mt-6">
                        <Button type="submit" :disabled="isLoading">
                            Back
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </AuthLayout>
</template>