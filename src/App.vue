<script setup lang="ts">
import { routes } from "vue-router/auto-routes";
</script>

<template>
    <div class="flex flex-col app">
        <div class="w-full h-6 bg-soft-[0%] titlebar">

        </div>
        <div class="font-sans">
            <h1>Hello, World!</h1>
            <p>
                <strong>Current route path:</strong> {{ $route.fullPath }}
            </p>
            <nav class="flex flex-row gap-3">
                <div v-for="route in routes" :key="route.path">
                    <RouterLink :to="route.path">{{ route.path }}</RouterLink>
                </div>
            </nav>
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
