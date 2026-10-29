import { ServiceType, ConsumptionUnit } from "./enums";

/**
 * DTO для создания записи о коммунальном счёте.
 */
export interface CreateBillDto {
  /** Название организации, выставившей счёт. */
  organizationName: string;

  /** Тип коммунальной услуги. */
  serviceType: ServiceType;

  /** Расчётный период, за который выставлен счёт, в формате YYYY-MM. */
  billingPeriod: string;

  /** Объём потребления коммунального ресурса за расчётный период. */
  consumption: number | null;

  /** Единица измерения потреблённого ресурса. */
  unit: ConsumptionUnit | null;

  /** Сумма начисления за расчётный период. */
  amount: number;

  /** Задолженность по счёту. */
  debt: number;

  /** Дата получения уведомления о счёте в формате ISO 8601. */
  notificationDate: string | null;

  /** Крайний срок оплаты счёта в формате ISO 8601. */
  dueDate: string | null;

  /** Дата фактической оплаты счёта в формате ISO 8601. */
  paidAt: string | null;

  /** Дополнительный комментарий к счёту. */
  comment: string | null;
}
