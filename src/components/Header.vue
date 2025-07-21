<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { FilePlus2, Menu, X } from 'lucide-vue-next';
import Model from './Model.vue';
import InputField from './InputField.vue';
import Button from './Button.vue';

defineProps<{ sidebarOpen: boolean }>();

const emit = defineEmits(['toggle-sidebar'])

const isOpen = ref(false);

const openModel = () => isOpen.value = true;
const closeModel = () => isOpen.value = false;

const title = ref("title");
const url = ref("https://chanpreet.com")
</script>

<template>
    <header class="bg-white border-b border-neutral-200 py-5 px-5 sm:px-5 md:px-8 sticky top-0 z-40">
        <div class="flex items-center justify-between">
            <!-- menu button -->
            <div class="flex items-center gap-3 lg:hidden order-2 sm:order-0 sm:mr-3">
                <button type="button" @click="openModel"
                    class="bg-neutral-50 rounded-md flex items-center justify-center p-2 hover:bg-green-600 hover:text-white cursor-pointer transition ease-in-out duration-200 size-10 ring-1 ring-neutral-200 sm:hidden">
                    <FilePlus2 class="size-7" />
                </button>
                <button type="button" @click="emit('toggle-sidebar')"
                    class="bg-neutral-50 hover:bg-neutral-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200 p-1.5 cursor-pointer size-10 ring-1 ring-neutral-200">
                    <component :is="sidebarOpen ? X : Menu" class="size-7" />
                </button>
            </div>
            <RouterLink to="/" class="flex items-center gap-2 header-logo">
                <div class="bg-black text-white size-9 text-lg font-extrabold rounded-md grid place-content-center">
                    N
                </div>
                <div class="font-bold text-lg">Nep</div>
            </RouterLink>
            <div class="sm:flex items-center gap-2 ml-auto hidden">
                <button type="button" @click="openModel"
                    class="bg-neutral-100 rounded-md sm:flex items-center justify-center p-1.5 hover:bg-green-600 hover:text-white cursor-pointer size-7 transition ease-in-out duration-200 hidden">
                    <FilePlus2 />
                </button>
                <div class="bg-neutral-100 text-neutral-600 text-xs rounded-md px-2.5 py-1.5">DOCS</div>
                <div class="bg-neutral-100 text-neutral-600 text-xs rounded-md px-2.5 py-1.5">V1.0</div>
            </div>
        </div>
    </header>

    <!-- Add Doc Model -->
    <Model :isOpen="isOpen" @close="closeModel" title="Add New Docs">
        <div class="flex flex-col space-y-3">
            <InputField v-model="title" id="title" label="Title" type="text" placeholder="Enter Docs Title" />
            <InputField v-model="url" id="url" label="Url" type="text" placeholder="Enter Docs Url" />
            <div class="flex gap-3 mt-4">
                <Button varient="primary" label="Add" class="w-full" />
                <Button varient="danger" label="Cancel" class="w-full" @click="closeModel" />
            </div>
        </div>
    </Model>
</template>