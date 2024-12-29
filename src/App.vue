<script setup lang="ts">
import { routes } from "vue-router/auto-routes";
</script>

<template>
    <div class="flex flex-col app">
        <Titlebar />
        <div class="font-sans">
            <nav class="flex flex-row gap-3">
                <div v-for="route in routes" :key="route.path">
                    <RouterLink active-class="border-indigo-500" class="border" :to="route.path">{{ route.path }}</RouterLink>
                </div>
            </nav>
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
