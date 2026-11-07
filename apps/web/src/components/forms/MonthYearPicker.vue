<script setup lang="ts">
import { computed, ref, watch } from "vue";
type ValidationRule = (value: string) => boolean | string;

const model = defineModel<string | null>({ default: null });
const props = defineProps<{
  rules: Array<ValidationRule>;
}>();

const menu = ref(false);

const selectedYear = ref(
  model.value ? Number(model.value.split("-").at(0)) : new Date().getFullYear(),
);

watch(model, (value) => {
  if (!value || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
    return;
  }

  selectedYear.value = Number(value.split("-")[0]);
});

const selectedMonth = computed({
  get: () => {
    if (!model.value) return -1;

    return Number(model.value.split("-")[1]) - 1;
  },
  set: (month: number) => {
    if (month < 0 || month > 11) return;

    model.value = `${selectedYear.value}-${String(month + 1).padStart(2, "0")}`;
    menu.value = false;
  },
});

const changeYear = (v: number) => {
  selectedYear.value = v;
};
</script>

<template>
  <v-menu v-model="menu" :close-on-content-click="false" :open-on-focus="false">
    <template #activator="{ props: activatorProps }">
      <v-text-field
        v-bind="activatorProps"
        density="compact"
        label="Расчётный период"
        :rules="props.rules"
        v-model="model"
        clearable
        autocomplete="off"
        readonly
        @click:clear="model = null"
      />
    </template>
    <v-card>
      <v-card-title>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click="changeYear(selectedYear - 1)"
        />
        {{ selectedYear }}
        <v-btn
          icon="mdi-chevron-right"
          variant="text"
          @click="changeYear(selectedYear + 1)"
        />
      </v-card-title>
      <v-date-picker-months v-model="selectedMonth" :year="selectedYear" />
    </v-card>
  </v-menu>
</template>

<style scoped></style>
