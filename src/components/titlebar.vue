<template>
    <div class="w-full p-var flex flex-row items-center justify-between">
        <div class="flex flex-1 flex-row gap-1 text-sm px-3 py-2 titlebar">
            <p class="txt-soft-[40%] hide-if-small">{{ date }}</p>
            <p class="txt-soft-[20%] hide-if-small">•</p>
            <p class="txt-soft-[40%]">{{ time }}</p>
        </div>
        <div class="flex flex-row gap-1">
            <TitlebarButton @click="windowStore.actions.minimize()">
                <CdChromeMinimize />
            </TitlebarButton>
            <div v-if="windowStore.state.maximized">
                <TitlebarButton @click="windowStore.actions.maximize()">
                    <CdChromeRestore />
                </TitlebarButton>
            </div>
            <div v-else>
                <TitlebarButton @click="windowStore.actions.maximize()">
                    <CdChromeMaximize />
                </TitlebarButton>
            </div>
            <TitlebarButton dangerous @click="windowStore.actions.close()">
                <CdChromeClose />
            </TitlebarButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 350px){
    .hide-if-small {
        display: none;
    }
}
</style>

<script setup lang="ts">
import TitlebarButton from './titlebar/titlebarButton.vue';
import { CdChromeMinimize, CdChromeMaximize, CdChromeRestore, CdChromeClose } from '@kalimahapps/vue-icons';
import { windowStore } from '../renderer';
import { ref, onMounted, onUnmounted } from 'vue';

const dateFormatter = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
});
const timeFormatter = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: false
});

const date = ref(dateFormatter.format(Date.now()));
const time = ref(timeFormatter.format(Date.now()));
let interval: NodeJS.Timeout;

onMounted(() => {
    // todo : this is not accurate.
    interval = setInterval(() => {
        const now = Date.now();
        date.value = dateFormatter.format(now);
        time.value = timeFormatter.format(now);
    }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
