<script setup lang="ts">
import { routes } from "vue-router/auto-routes";

console.log(`There are ${routes.length} routes.`);
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
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/teapot">Teapot</RouterLink>
            </nav>
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>
