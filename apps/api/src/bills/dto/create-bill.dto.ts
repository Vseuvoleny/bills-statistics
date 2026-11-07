import type { CreateBillDto as CreateBillDtoInterface } from '@repo/shared-types';
import { ServiceType, ConsumptionUnit } from '@repo/shared-types';

import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateBillDto implements CreateBillDtoInterface {
  @IsEnum(ServiceType)
  serviceType!: ServiceType;

  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/)
  billingPeriod!: string;

  @IsNumber()
  @IsOptional()
  consumption!: number | null;

  @IsEnum(ConsumptionUnit)
  @IsOptional()
  unit!: ConsumptionUnit | null;

  @IsNumber()
  @IsOptional()
  amount!: number;
  @IsNumber()
  @IsOptional()
  debt!: number | null;
  @IsDateString()
  @IsOptional()
  notificationDate!: string | null;
  @IsDateString()
  @IsOptional()
  dueDate!: string | null;
  @IsDateString()
  @IsOptional()
  paidAt!: string | null;
  @IsString()
  @IsOptional()
  comment!: string | null;
  @IsString()
  @Matches(/\S/, {
    message:
      'organizationName must contain at least one non-whitespace character',
  })
  organizationName!: string;
}
