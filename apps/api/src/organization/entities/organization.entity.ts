import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationService } from '../organization.service';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  inn!: string | null;

  @OneToMany(() => OrganizationService, (service) => service.organization)
  services!: OrganizationService[];
}
