<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { Docs } from '@/types/docs';
import Title from '@/components/Title.vue';
import { VueSpinnerTail } from 'vue3-spinners';

const docs = ref<Docs[]>([]);

const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    try {
        const { data } = await axios.get("https://nep-api-orcin.vercel.app/api", {
            params: { collection: "general-english" }
        });
        docs.value = data.docs;
    } catch (error) {
        console.error("Failed to fetch:", error);
    } finally {
        isLoading.value = false;
    }
})

</script>

<template>
    <Title>General English</Title>
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
        <VueSpinnerTail size="40" color="#00a6f4" />
    </div>
    <div v-else-if="docs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <RouterLink :to="{ path: `/dashboard/docs/${doc._id}`, query: { collection: 'general-english' } }"
            v-for="doc in docs" :key="doc._id"
            class="bg-white ring-1 ring-neutral-200 rounded-lg p-4 cursor-pointer group">
            <h1 class="text-lg font-medium group-hover:text-sky-600 transition duration-200 text-center">
                {{ doc.title }}
            </h1>
        </RouterLink>
    </div>
    <p v-else class="text-neutral-700">No documents</p>
</template>