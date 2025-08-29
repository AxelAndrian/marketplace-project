<script setup lang="ts">
    import { vAutoAnimate } from '@formkit/auto-animate/vue';
    import { toTypedSchema } from '@vee-validate/zod';
    import { Loader2 } from 'lucide-vue-next';
    import { useForm } from 'vee-validate';
    import { useRouter } from 'vue-router';
    import { useColorMode } from '@vueuse/core';
    import { toast } from 'vue-sonner';
    import { Icon } from '@iconify/vue'
    import { ref } from 'vue';
    
    import { useAuthStore } from '@/stores/auth';
    import { loginSchema } from './_interfaces/login';

    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

    const authStore = useAuthStore();
    const router = useRouter();

    const isLoading = ref(false);

    const formSchema = toTypedSchema(loginSchema);

    const form = useForm({
        validationSchema: formSchema,
    });

    const onSubmit = form.handleSubmit(async (values) => {
        isLoading.value = true
        try {
            await authStore.login(values);
            toast("Login Successful", {
                description: "Welcome to the dashboard!",
                position: 'top-right'
            });
            router.push({ path: '/' });
        } catch (error) {
            toast("Login Failed", {
                description: "Check your credentials and try again.",
                position: 'top-right',
            });
            console.error('Login failed:', error);
        } finally {
            isLoading.value = false;
        }
    });

    const mode = useColorMode({ disableTransition: false });
</script>

<template>
    <div class="relative">
        <div class="absolute top-4 right-4">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline">
                        <Icon icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Icon icon="radix-icons:moon" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="mode = 'light'">
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="mode = 'dark'">
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="mode = 'auto'">
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <section class="w-full h-screen flex justify-center items-center">
            <div>
                <Card class="w-[450px] p-6">
                    <CardHeader>
                        <CardTitle class="text-2xl font-semibold">Login</CardTitle>
                        <CardDescription>Please enter your credentials to log in.</CardDescription>
                    </CardHeader>
                    <form @submit="onSubmit">
                        <CardContent class="space-y-6">
                            <FormField v-slot="{ componentField }" name="username">
                                <FormItem v-auto-animate>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Input Username" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="password">
                                <FormItem v-auto-animate>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Input Password" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </CardContent>
                        <CardFooter class="flex justify-end mt-6">
                            <Button type="submit" :disabled="isLoading">
                                <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
                                Login
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </section>
    </div>
</template>