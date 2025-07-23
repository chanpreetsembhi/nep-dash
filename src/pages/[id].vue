<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SquarePen, Trash } from 'lucide-vue-next';
import axios from 'axios';
import { VueSpinnerTail } from 'vue3-spinners';
import type { Docs as Doc } from '@/types/docs';
import DocView from '@/components/DocView.vue';
import Model from '@/components/Model.vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();
const doc = ref<Doc | null>(null);

const isLoading = ref(false);
const error = ref<string | null>(null);

const isOpen = ref(false);
const closeModel = () => isOpen.value = false;
const openModel = () => {
    if (doc.value) {
        title.value = doc.value.title;
        url.value = doc.value.url;
    }
    isOpen.value = true;
};

const title = ref()
const url = ref()

// fetch doc
onMounted(async () => {
    isLoading.value = true;
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
    } finally {
        isLoading.value = false
    }
})

// edit doc
const editDoc = async () => {
    const _id = route.params.id as string;
    const collection = route.query.collection as string;

    if (!title.value) {
        error.value = "Title is Required";
    }

    if (!url.value) {
        error.value = "Title is Required";
    }

    try {
        await axios.put(`/api/edit/${_id}`, {
            title: title.value,
            url: url.value,
            collection,
        });
        isOpen.value = false;
        // Refresh the doc with updated data
        const response = await axios.get(`/api/${_id}`, {
            params: { collection },
        });
        doc.value = response.data.doc;
        toast.success("Updated Successfully");
    } catch (error) {
        console.error("Failed to Edit", error);
        toast.error("Failed to update the document");
    }
};

// Delete Doc
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
    <div v-if="isLoading" class="flex items-center justify-center h-full">
        <VueSpinnerTail size="40" color="#00a6f4" />
    </div>
    <div v-else-if="doc">
        <div class="flex items-center justify-between pb-6">
            <h1 class="text-2xl font-bold">{{ doc.title }}</h1>
            <div class="flex items-center gap-2">
                <button @click="openModel" type="button"
                    class="bg-neutral-200 rounded-md flex items-center justify-center p-2 hover:bg-indigo-500 hover:text-white cursor-pointer size-8 transition ease-in-out duration-200">
                    <SquarePen />
                </button>
                <button @click="deleteDoc" type="button"
                    class="bg-neutral-200 rounded-md flex items-center justify-center p-2 hover:bg-red-500 hover:text-white cursor-pointer size-8 transition ease-in-out duration-200">
                    <Trash />
                </button>
            </div>
        </div>
        <DocView :file="doc.url" />
    </div>
    <div v-else>
        <p class="text-red-500">Document not found.</p>
    </div>

    <!-- Edit model -->
    <Model :isOpen="isOpen" @close="closeModel" title="Edit Doc">
        <div class="flex flex-col space-y-3">
            <InputField v-model="title" id="title" label="Title" type="text" placeholder="Edit Docs Title" />
            <InputField v-model="url" id="url" label="Url" type="text" placeholder="Edit Docs Url" />
            <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
        </div>
        <div class="flex gap-3 mt-4">
            <Button varient="primary" label="Edit" class="w-full" @click="editDoc" />
            <Button varient="danger" label="Cancel" class="w-full" @click="closeModel" />
        </div>
    </Model>
</template>