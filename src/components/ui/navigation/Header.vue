<script setup lang="ts">
    import { useColorMode } from '@vueuse/core';
    import { House } from 'lucide-vue-next';
    import { useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue'
    
    import { Button } from '@/components/ui/button'
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

    import { useAuthStore } from '@/stores/auth';

    const mode = useColorMode({ disableTransition: false });

    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        authStore.logout();
        router.push('/login');
    }
</script>

<template>
    <div class="mt-6 flex justify-center items-center">
        <nav class="bg-card text-card-foreground flex items-center gap-6 py-4 px-6 shadow-sm border rounded-full w-auto">
            <Button variant="ghost" as-child>
                <RouterLink to="/">
                    <House :size="20" />
                </RouterLink>
            </Button>
            <Button variant="ghost" as-child>
                <RouterLink to="/products">Products</RouterLink>
            </Button>
            <Button variant="ghost" as-child>
                <RouterLink to="cart">Cart</RouterLink>
            </Button>
            <div class="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost">
                            <Icon icon="radix-icons:person" class="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="handleLogout">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost">
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
        </nav>
    </div>
</template>