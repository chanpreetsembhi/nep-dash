<script setup lang="ts">
import { marked } from 'marked';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    file: string
}>();

const markdown = ref<any>("Loading...");


function toRawGitHubUrl(url: string): string {
    return url
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');
}

onMounted(async () => {
    try {
        const rawUrl = toRawGitHubUrl(props.file);
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();

        if (text.includes('<html') && text.includes('</html>')) {
            throw new Error('Received HTML instead of Markdown');
        }

        markdown.value = marked.parse(text);
    } catch (error) {
        console.error('Failed to load markdown file:', error);
        markdown.value = 'Error loading content.';
    }
});

</script>

<template>
    <div class="prose max-w-none" v-html="markdown"></div>
</template>