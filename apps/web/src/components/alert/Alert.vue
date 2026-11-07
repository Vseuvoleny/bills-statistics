<script setup lang="ts">
import { ref, watch } from "vue";
import type { Anchor } from "vuetify";

const isSnackbarVisible = ref(false);
const modelMessage = defineModel<{
  title?: string;
  timeout?: number;
  color?: string;
  text?: string;
} | null>("message", {
  default: null,
});

watch(modelMessage, (message) => {
  if (modelMessage) {
    isSnackbarVisible.value = !!message;
  }
});

const props = withDefaults(
  defineProps<{
    timer?: "top" | "bottom";
    class?: string;
    location?: Anchor;
    "timer-color"?: string;
  }>(),
  {
    timer: "bottom",
    class: "",
    location: "bottom right",
    "timer-color": "white",
  },
);

const afterLeave = () => {
  isSnackbarVisible.value = false;
};
</script>
<template>
  <v-snackbar
    v-model="isSnackbarVisible"
    v-bind="modelMessage"
    timer-color="props['timer-color']"
    :location="props.location"
    :timer="props.timer"
    :class="props.class"
    @after-leave="afterLeave"
    >{{ modelMessage?.text }}</v-snackbar
  >
</template>
