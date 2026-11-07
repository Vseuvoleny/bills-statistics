import { ConsumptionUnit, ServiceType } from '@repo/shared-types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column('enum', { enum: ServiceType })
  serviceType!: ServiceType;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
  @Column('varchar', { length: 7 })
  billingPeriod!: string;
  @Column('numeric', { nullable: true, precision: 12, scale: 4 })
  consumption!: string | null;
  @Column('enum', { nullable: true, enum: ConsumptionUnit })
  unit!: ConsumptionUnit | null;
  @Column('numeric', { precision: 12, scale: 2 })
  amount!: string;
  @Column('numeric', { precision: 12, scale: 2, nullable: true })
  debt!: string | null;
  @Column('date', { nullable: true })
  notificationDate!: Date | null;
  @Column('date', { nullable: true })
  dueDate!: Date | null;
  @Column('date', { nullable: true })
  paidAt!: Date | null;
  @Column('text', { nullable: true })
  comment!: string | null;
  @Column('text')
  organizationName!: string;
}
