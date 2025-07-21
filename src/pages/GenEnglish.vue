<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Title from '@/components/Title.vue';
import axios from 'axios';

type Docs = {
    _id: string
    title: string
    url: string
}

const docs = ref<Docs[]>([]);

onMounted(async () => {
    try {
        const { data } = await axios.get("/api", {
            params: { collection: "general-english" }
        });
        docs.value = data.docs;
    } catch (error) {
        console.error("Failed to fetch:", error);
    }
})

</script>

<template>
    <Title>General English</Title>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <RouterLink :to="{ path: `/dashboard/docs/${doc._id}`, query: { collection: 'general-english' } }"
            v-for="doc in docs" :key="doc._id"
            class="bg-white ring-1 ring-neutral-200 rounded-lg p-4 cursor-pointer group">
            <h1 class="text-lg font-medium group-hover:text-sky-600 transition duration-200 text-center">
                {{ doc.title }}
            </h1>
        </RouterLink>
    </div>
</template>