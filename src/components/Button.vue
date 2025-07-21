<script setup lang="ts">
defineProps<{
    label: string
    varient: "primary" | "secondary" | "danger"
}>();
</script>

<template>
    <button type="button" :class="{
        'bg-sky-100 text-sky-900 hover:bg-sky-200': varient === 'primary',
        'bg-red-100 text-red-900 hover:bg-red-200': varient === 'danger'
    }"
        class="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium cursor-pointer">
        {{ label }}
    </button>
</template>