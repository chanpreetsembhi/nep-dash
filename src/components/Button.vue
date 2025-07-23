<script setup lang="ts">
defineProps<{
    label: string
    varient: "primary" | "secondary" | "danger"
    disabled?: boolean
}>();
</script>

<template>
    <button type="button" :class="{
        'bg-sky-100 text-sky-900 hover:bg-sky-200': varient === 'primary',
        'bg-red-100 text-red-900 hover:bg-red-200': varient === 'danger',
        '!bg-neutral-100 !text-neutral-900 !cursor-not-allowed': disabled
    }" class="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium cursor-pointer"
        :disabled="disabled">
        {{ label }}
    </button>
</template>