<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logo from "@/assets/logo.svg";
</script>

<template>
    <section class="flex items-center justify-center h-svh">
        <div class="mx-auto max-w-2xl">
            <img :src="Logo" class="size-18 sm:size-24 mx-auto" />
            <div class="text-center p-5 sm:mt-3">
                <h1 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                    NEP Education Docs For Students
                </h1>
                <p class="mt-5 text-base font-medium text-pretty text-gray-500 sm:text-lg/8">Explore student-friendly
                    docs designed to simplify complex topics. From English literature to NEP concepts, learn smarter
                    with quick summaries and key points.</p>
                <div class="mt-10">
                    <RouterLink to="/dashboard/general-english"
                        class="rounded-md bg-indigo-600 px-4 py-2.5 font-semibold text-base text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Get started
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>