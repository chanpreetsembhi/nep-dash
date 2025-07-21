<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Trash } from 'lucide-vue-next';
import axios from 'axios';
import DocView from '@/components/DocView.vue';

type Doc = {
    _id: string
    url: string
    title: string
}

const route = useRoute();
const router = useRouter();
const doc = ref<Doc | null>(null);

onMounted(async () => {
    try {
        const _id = route.params.id as string;
        const collection = route.query.collection as string;

        if (!_id || !collection) {
            console.error('Missing _id or collection in query params');
            return;
        }

        const response = await axios.get(`/api/${_id}`, {
            params: { collection },
        });
        doc.value = response.data.doc || null;
    } catch (error) {
        console.error("Failed to fetch:", error);
        doc.value = null
    }
})

const deleteDoc = async () => {
    const _id = route.params.id as string;
    const collection = route.query.collection as string;

    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
        await axios.delete(`/api/delete/${_id}`, {
            params: { collection }
        });
        router.back();
    } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete the document.");
    }
}

</script>

<template>
    <div v-if="doc">
        <div class="flex items-center justify-between pb-6">
            <h1 class="text-2xl font-bold">{{ doc.title }}</h1>
            <button @click="deleteDoc" type="button"
                class="bg-neutral-200 rounded-md flex items-center justify-center p-1.5 hover:bg-red-500 hover:text-white cursor-pointer size-8 transition ease-in-out duration-200">
                <Trash />
            </button>
        </div>
        <DocView :file="doc.url" />
    </div>
    <div v-else>
        <p class="text-red-500">Document not found.</p>
    </div>
</template>