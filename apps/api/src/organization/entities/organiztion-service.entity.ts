import { ServiceType, ConsumptionUnit } from '@repo/shared-types';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
@Unique(['organizationId', 'serviceType'])
export class OrganizationService {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  organizationId!: string;

  @ManyToOne(() => Organization, (organization) => organization.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  organization!: Organization;

  @Column('enum', { enum: ServiceType })
  serviceType!: ServiceType;

  @Column('enum', {
    enum: ConsumptionUnit,
    nullable: true,
  })
  defaultUnit!: ConsumptionUnit | null;
}
