<script setup lang="ts">
    import { ref } from 'vue';
    import { toast } from 'vue-sonner';
    import { useRouter } from 'vue-router';
    import { useForm } from 'vee-validate';
    import { Loader2 } from 'lucide-vue-next';
    import { toTypedSchema } from '@vee-validate/zod';
    import { vAutoAnimate } from '@formkit/auto-animate/vue';
    import AuthLayout from '@/components/layouts/AuthLayout.vue';

    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb'
    import { FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Textarea } from '@/components/ui/textarea';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';

    import { useProductStore } from '@/stores/products';
    import { productSchema } from './_interfaces';

    const isLoading = ref(false);

    const productStore = useProductStore();
    const router = useRouter();

    const formSchema = toTypedSchema(productSchema);

    const form = useForm({
        validationSchema: formSchema,
    });

    const onSubmit = form.handleSubmit(async (values) => {
        isLoading.value = true;
        try {
            let objProduct = { ...values, id: Number(localStorage.getItem("productLength")) };
            await productStore.createProduct(objProduct);
            toast("Product Created", {
                description: "The product has been created successfully.",
                position: 'top-right'
            });
            router.push({ path: '/products' });
        } catch (error) {
            console.error('Error creating product:', error);
            toast("Creation Failed", {
                description: "There was an issue creating the product.",
                position: 'top-right',
            });
        } finally {
            isLoading.value = false;
        }
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
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle class="text-2xl font-semibold">Create Product</CardTitle>
                </CardHeader>
                <form @submit="onSubmit">
                    <CardContent class="grid grid-cols-2 gap-6">
                        <FormField v-slot="{ componentField }" name="title">
                            <FormItem v-auto-animate>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Input Title" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="price">
                            <FormItem v-auto-animate>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Input Price" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="category">
                            <FormItem v-auto-animate>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Input Category" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="image">
                            <FormItem v-auto-animate>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Input Image" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="description">
                            <FormItem v-auto-animate class="col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Input Description" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </CardContent>
                    <CardFooter class="flex justify-end items-center gap-2 mt-6">
                        <Button variant="outline" as-child>
                            <RouterLink to="/products">
                                Cancel
                            </RouterLink>
                        </Button>
                        <Button type="submit" :disabled="isLoading">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
                            Create
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </AuthLayout>
</template>