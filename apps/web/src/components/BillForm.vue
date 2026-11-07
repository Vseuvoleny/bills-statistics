<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from "vue";
import MonthYearPicker from "./forms/MonthYearPicker.vue";
import {
  CONSUMPTION_NAME,
  SERVICE_TYPE_NAME,
  ServiceType,
} from "../shared/contstants/ServiceType";
import { createBill } from "@/shared/services/bills/index.ts";
import Alert from "./alert/Alert.vue";

type InitialValueType = {
  organizationName: string;
  serviceType: ServiceType | null;
  consumption: number | null;
  unit: CONSUMPTION_NAME | null;
  amount: number | null;
  debt: number | null;
  notificationDate: string | null;
  dueDate: Date | null;
  paidAt: Date | null;
  comment: string;
  billingPeriod: string | null;
};

onMounted(() => {});
const isValid = ref(false);

const initialForm: InitialValueType = {
  organizationName: "",
  serviceType: null,
  consumption: null,
  unit: null,
  amount: null,
  debt: null,
  notificationDate: null,
  dueDate: null,
  paidAt: null,
  comment: "",
  billingPeriod: null,
};

const billForm = ref({ ...initialForm });
const isSnackbarVisible = ref(false);
const message = ref({ title: "", timeout: 5000, color: "success" });

watch(
  () => billForm.value.serviceType,
  (newForm) => {
    if (newForm === ServiceType.ELECTRICITY) {
      billForm.value.unit = CONSUMPTION_NAME.KWH;
    }
    if (
      newForm &&
      [ServiceType.GAS, ServiceType.COLD_WATER].includes(newForm)
    ) {
      billForm.value.unit = CONSUMPTION_NAME.CUBIC_METER;
    }
  },
);

const organizationRules = [
  (v: string) => {
    if (!v?.trim()) {
      return "Наименование организации обязательно";
    }
    return true;
  },
];

const serviceTypeRules = [
  (v: string) => {
    if (!v?.trim()) {
      return "Наименование услуг обязательно";
    }
    return true;
  },
];

const consumptionRules = [
  (v: string) => {
    return true;
  },
];

const amountRules = [
  (v: string) => {
    return true;
  },
];

const billingPeriodRules = [
  (v: string) => {
    if (!v) {
      return "Период времени обязателен";
    }
    return true;
  },
];

const submit = async () => {
  createBill(billForm.value)
    .then((res) => {
      console.log({ res });
      billForm.value = { ...initialForm };
      isSnackbarVisible.value = true;
      message.value = { ...message.value, title: "Успешно", color: "success" };
    })
    .catch((e) => {
      isSnackbarVisible.value = true;
      message.value = { ...message.value, title: "Ошибка", color: "error" };
    });
};

const clear = () => {
  billForm.value = { ...initialForm };
};
</script>

<template>
  <v-form v-model="isValid" @submit.prevent="submit" validate-on="submit">
    <v-container>
      <v-row>
        <v-col>
          <v-col>
            <v-text-field
              density="compact"
              label="Организация"
              v-model="billForm.organizationName"
              :rules="organizationRules"
              required
              autocomplete="off"
            />
          </v-col>
          <v-col>
            <v-select
              density="compact"
              label="Тип услуг"
              v-model="billForm.serviceType"
              validate-on="submit"
              :rules="serviceTypeRules"
              item-title="title"
              item-value="value"
              :items="[
                {
                  title: SERVICE_TYPE_NAME.COLD_WATER,
                  value: ServiceType.COLD_WATER,
                },
                {
                  title: SERVICE_TYPE_NAME.ELECTRICITY,
                  value: ServiceType.ELECTRICITY,
                },
                { title: SERVICE_TYPE_NAME.GAS, value: ServiceType.GAS },
                { title: SERVICE_TYPE_NAME.OTHER, value: ServiceType.OTHER },
              ]"
              required
            />
          </v-col>
          <template
            v-if="
              billForm.serviceType && billForm.serviceType !== ServiceType.OTHER
            "
          >
            <v-col>
              <v-number-input
                control-variant="hidden"
                label="Объём потребления"
                :rules="consumptionRules"
                v-model="billForm.consumption"
                :precision="4"
              />
            </v-col>
            <v-col>
              <v-text-field
                density="compact"
                label="Единица измерения"
                :model-value="billForm.unit"
                readonly
              />
            </v-col>
          </template>

          <v-col>
            <MonthYearPicker
              v-model="billForm.billingPeriod"
              :rules="billingPeriodRules"
            />
          </v-col>
          <v-col>
            <v-number-input
              density="compact"
              label="Сумма начисления за расчётный период"
              v-model="billForm.amount"
              :rules="amountRules"
              required
              :precision="2"
              control-variant="hidden"
            />
          </v-col>
          <v-col>
            <v-number-input
              density="compact"
              label="Задолженность по счёту"
              v-model="billForm.debt"
              :precision="2"
              control-variant="hidden"
            />
          </v-col>
          <v-col>
            <v-date-input
              density="compact"
              label="Дата получения уведомления о счёте"
              v-model="billForm.notificationDate"
            />
          </v-col>
          <v-col>
            <v-date-input
              density="compact"
              label="Крайний срок оплаты счёта"
              v-model="billForm.dueDate"
            />
          </v-col>
          <v-col>
            <v-date-input
              density="compact"
              label="Дата фактической оплаты счёта"
              v-model="billForm.paidAt"
              required
            />
          </v-col>
          <v-col>
            <v-textarea
              density="compact"
              label="Дополнительный комментарий к счёту"
              v-model="billForm.comment"
            />
          </v-col>
        </v-col>
      </v-row>
      <v-btn-group divided>
        <v-btn type="submit">Отправить</v-btn>
        <v-btn @click="clear">Очистить</v-btn>
      </v-btn-group>
    </v-container>
  </v-form>
  <Alert v-model:message="message" class="pa-4" />
</template>

<style scoped></style>
