<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { ExternalLink, Globe } from 'lucide-vue-next'

type MenuLinks = {
    to: string,
    title: string,
    children?: { to: string, title: string }[]
}

const menuLinks: MenuLinks[] = [
    { to: "/dashboard/general-english", title: "General English" },
    { to: "/dashboard/elective-english", title: "Elective English" },
    { to: "/dashboard/computer", title: "Computer Science" },
]

defineProps<{
    open: boolean
}>();

const emit = defineEmits(['close']);
</script>
<template>
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-30 lg:hidden" @close="emit('close')">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 top-20 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel
                        class="relative flex w-full sm:max-w-xs flex-col overflow-y-auto bg-white shadow-xl mt-20">
                        <main class="flex flex-col justify-between h-full">
                            <!-- Links -->
                            <nav class="flex flex-col space-y-1.5 w-full p-5">
                                <div v-for="menulink in menuLinks" :key="menulink.to" @click="emit('close')">
                                    <RouterLink :to="menulink.to"
                                        class="text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 block"
                                        active-class="bg-sky-100 text-sky-600 hover:bg-sky-100">
                                        {{ menulink.title }}
                                    </RouterLink>

                                    <div v-if="menulink.children"
                                        class="flex flex-col space-y-1 border-l border-neutral-300 pl-2 ml-4 my-1">
                                        <RouterLink v-for="link in menulink.children" :key="link.to" :to="link.to"
                                            class="text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 block"
                                            active-class="bg-sky-100 text-sky-600 hover:bg-sky-100">
                                            {{ link.title }}
                                        </RouterLink>
                                    </div>
                                </div>
                            </nav>
                            <a href="https://chanpreetportfolio.vercel.app" target="_blank"
                                class="flex items-center gap-2 hover:bg-neutral-100 text-neutral-600 border-t border-neutral-200 p-5">
                                <Globe class="size-4" />
                                <p class="text-sm">Visit Website</p>
                                <ExternalLink class="size-4 ml-auto" />
                            </a>
                        </main>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
    <aside class="bg-white w-1/5 border-r border-gray-200 dark:border-gray-700 hidden lg:flex flex-col justify-between">
        <nav class="flex flex-col space-y-1.5 w-full overflow-auto p-5">
            <div v-for="menulink in menuLinks" :key="menulink.to">
                <RouterLink :to="menulink.to" class="text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 block"
                    active-class="bg-sky-100 text-sky-600 hover:bg-sky-100">
                    {{ menulink.title }}
                </RouterLink>

                <div v-if="menulink.children"
                    class="flex flex-col space-y-1 border-l border-neutral-300 pl-2 ml-4 my-1">
                    <RouterLink v-for="link in menulink.children" :key="link.to" :to="link.to"
                        class="text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 block"
                        active-class="bg-sky-100 text-sky-600 hover:bg-sky-100">
                        {{ link.title }}
                    </RouterLink>
                </div>
            </div>
        </nav>
        <a href="https://chanpreetportfolio.vercel.app" target="_blank"
            class="flex items-center gap-2 hover:bg-neutral-100 text-neutral-600 border-t border-neutral-200 p-5">
            <Globe class="size-4" />
            <p class="text-sm">Visit Website</p>
            <ExternalLink class="size-4 ml-auto" />
        </a>
    </aside>
</template>