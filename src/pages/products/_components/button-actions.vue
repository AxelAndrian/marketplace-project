<script setup lang="ts">
    import { Button } from '@/components/ui/button';
import type { Product } from '../_types';
import { Eye, ShoppingCart } from 'lucide-vue-next';

    const props = defineProps<{
        data: Product
    }>();
</script>

<template>
    <div class="flex items-center gap-2">
        <Button as-child>
            <RouterLink :to="`/products/${props.data.id}`">
                <Eye :size="16" />
            </RouterLink>
        </Button>
        <Button>
            <ShoppingCart :size="16" />
        </Button>
    </div>
</template>