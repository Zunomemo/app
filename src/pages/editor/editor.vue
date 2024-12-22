<template>
    <div ref="editor" class="w-full h-full" />
</template>

<script setup lang="ts">
import { EditorState, Text } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { vim } from "@replit/codemirror-vim";
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';

const editor = ref<HTMLElement | undefined>();
const doc = ref<string | Text>('');

const view = shallowRef(new EditorView());

onMounted(async () => {
    view.value = new EditorView({
        parent: editor.value,
        state: EditorState.create({ doc: doc.value, extensions: [vim(), keymap.of(defaultKeymap)] })
    });
});

onUnmounted(() => {
    view.value.destroy();
});
</script>
