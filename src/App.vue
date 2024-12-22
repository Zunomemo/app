<script setup lang="ts">
import { routes } from "vue-router/auto-routes";

console.log(`There are ${routes.length} routes.`);
</script>

<template>
    <div class="app font-sans">
        <h1>Hello, World!</h1>
        <RouterView />
    </div>
</template>
