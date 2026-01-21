<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SquarePen, Trash2 } from 'lucide-vue-next'
import axios from 'axios'
import { VueSpinnerTail } from 'vue3-spinners'
import type { Docs as Doc, Topic } from '@/types/subject'
import DocView from '@/components/DocView.vue'
import Model from '@/components/Model.vue'
import InputField from '@/components/InputField.vue'
import Button from '@/components/Button.vue'
import { toast } from 'vue3-toastify'
import { useAuth } from '@/composables/useAuth'

const { isAdmin } = useAuth()

const route = useRoute()
const router = useRouter()
const topicName = ref<Topic | null>(null)
const subjectId = ref<string>('')
const topicId = ref<string>('')

// Model handlers
const isLoading = ref(false)
const error = ref<string | null>(null)
const isEditOpen = ref(false)
const isDeleteOpen = ref(false)

const closeEditModel = () => (isEditOpen.value = false)
const openEditModel = () => {
  if (topicName.value) {
    title.value = topicName.value.topic
    url.value = topicName.value.url
  }
  isEditOpen.value = true
}

const closeDeleteModel = () => (isDeleteOpen.value = false)
const openDeleteModel = () => (isDeleteOpen.value = true)

const title = ref()
const url = ref()

// fetch topic
onMounted(async () => {
  isLoading.value = true
  try {
    subjectId.value = route.params.subjectId as string
    topicId.value = route.params.topicId as string

    if (!subjectId.value || !topicId.value) {
      console.log('Missing subject or topic ID in route params')
      return
    }

    const response = await axios.get(
      `https://nep-backend.vercel.app/api/subjects/${subjectId.value}/topic/${topicId.value}`,
    )

    topicName.value = response.data.doc || null
    topicName.value = response.data.topic || ''
  } catch (error) {
    console.error('Failed to fetch:', error)
    topicName.value = null
  } finally {
    isLoading.value = false
  }
})

// edit doc
const editDoc = async () => {
  // reset error
  error.value = null

  // Validation
  if (!title.value.trim() && !url.value.trim()) {
    error.value = 'Title and URL are required'
    return
  } else if (!title.value.trim()) {
    error.value = 'Title is required'
    return
  } else if (!url.value.trim()) {
    error.value = 'URL is required'
    return
  }

  try {
    await axios.put(
      `https://nep-backend.vercel.app/api/subjects/${subjectId.value}/topic/${topicId.value}`,
      {
        topic: title.value,
        url: url.value,
      },
    )

    closeEditModel()
    toast.success('Update successfully', { autoClose: 100 })

    // Refresh the doc with updated data
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://nep-backend.vercel.app/api/subjects/${subjectId.value}/topics/${topicId.value}`,
        )
        topicName.value = response.data.topic || null
      } catch (error) {
        console.error('Failed to refresh topic:', error)
        window.location.reload()
      }
    }, 1000)
  } catch (error) {
    console.error('Failed to Edit', error)
    toast.error('Failed to update the document')
  }
}

// Delete Doc
const deleteDoc = async () => {
  try {
    await axios.delete(
      `https://nep-backend.vercel.app/api/subjects/${subjectId.value}/topic/${topicId.value}`,
    )
    toast.success('Document delete successfully', { autoClose: 1000 })
    setTimeout(() => {
      router.back()
    }, 1000)
  } catch (error) {
    console.error('Delete failed:', error)
    toast.error('Failed to delete the document')
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <VueSpinnerTail size="40" color="#00a6f4" />
  </div>
  <div v-else-if="topicName">
    <div class="flex items-center justify-between pb-6">
      <h1 class="text-2xl font-bold">{{ topicName.topic }}</h1>
      <div class="flex items-center gap-2" v-if="isAdmin">
        <button
          @click="openEditModel"
          type="button"
          class="bg-neutral-200 rounded-md flex items-center justify-center p-2 hover:bg-indigo-500 hover:text-white cursor-pointer size-8 transition ease-in-out duration-200"
        >
          <SquarePen />
        </button>
        <button
          @click="openDeleteModel"
          type="button"
          class="bg-neutral-200 rounded-md flex items-center justify-center p-2 hover:bg-red-500 hover:text-white cursor-pointer size-8 transition ease-in-out duration-200"
        >
          <Trash2 />
        </button>
      </div>
    </div>
    <DocView :file="topicName.url" />
  </div>
  <p v-else class="text-red-500">Document not found.</p>

  <!-- Edit model -->
  <Model :isOpen="isEditOpen" @close="closeEditModel" title="Edit Doc">
    <div class="flex flex-col space-y-3">
      <InputField
        v-model="title"
        id="title"
        label="Title"
        type="text"
        placeholder="Edit Docs Title"
      />
      <InputField v-model="url" id="url" label="Url" type="text" placeholder="Edit Docs Url" />
      <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    </div>
    <div class="flex gap-3 mt-6">
      <Button varient="primary" label="Edit" class="w-full" @click="editDoc" />
      <Button varient="danger" label="Cancel" class="w-full" @click="closeEditModel" />
    </div>
  </Model>

  <!-- Delete model -->
  <Model :isOpen="isDeleteOpen" @close="closeDeleteModel">
    <div class="flex items-start gap-3">
      <div class="size-10 bg-red-100 flex items-center justify-center rounded-full shrink-0">
        <Trash2 class="text-red-600 size-5" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900 pb-1">Delete document</h3>
        <p class="text-sm text-gray-500">
          Are you sure you want to delete this document? All of your data will be permanently
          removed. This action cannot be undone.
        </p>
      </div>
    </div>
    <div class="flex gap-3 mt-6">
      <Button varient="primary" label="Confirm" class="w-full" @click="deleteDoc" />
      <Button varient="danger" label="Cancel" class="w-full" @click="closeDeleteModel" />
    </div>
  </Model>
</template>
