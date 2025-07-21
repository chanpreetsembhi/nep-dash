<script setup lang="ts">
import { ref } from 'vue'
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'

const people = [
    { name: 'General English' },
    { name: 'Elective English' },
    { name: 'Computer' },
]

defineProps<{
    label: string
}>();

const selectedSubject = defineModel<any>() 
</script>

<template>
    <Listbox v-model="selectedSubject">
        <ListboxLabel as="Div" class="block text-sm/6 font-semibold text-gray-900 mb-1.5">{{ label }}</ListboxLabel>
        <div class="relative">
            <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm outline-1 -outline-offset-1 outline-gray-300">
                <span class="block truncate">{{ selectedSubject.name }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronsUpDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="person in people" :key="person.name"
                        :value="person" as="template">
                        <li :class="[
                            active ? 'bg-sky-100 text-sky-900' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                            <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                            ]">{{ person.name }}</span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                                <Check class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
