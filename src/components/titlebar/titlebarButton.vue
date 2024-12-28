<template>
    <button 
        class="px-3 py-2 flex items-center justify-center rounded-var transition-colors txt-soft-[20%] hover:txt-soft-[40%]"
        :class="{ 'hover:bg-red-500': props.dangerous, 'hover:bg-soft-[7%]': !props.dangerous, 'hover:txt-soft-[95%]': props.dangerous }"
        @click="props.onClick">
        <slot />
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    dangerous?: boolean;
    onClick: () => void;
}>();
</script>
