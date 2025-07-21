<script setup lang="ts">
defineProps<{
    id: string
    label: string
    type: string,
    placeholder?: string
    value?: string
    modelValue: string
}>();

const emit = defineEmits<{
    (e: 'update', modelValue: string): void
}>();

</script>
<template>
    <div class="flex flex-col space-y-1">
        <label :for="id" class="block text-sm/6 font-semibold text-gray-900">{{ label }}</label>
        <input :id="id" :type="type" :name="id" :placeholder="placeholder" :value="value"
            @input="emit('update', ($event.target as any)?.value)"
            class="block w-full rounded-md bg-white px-3.5 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600" />
    </div>
</template>