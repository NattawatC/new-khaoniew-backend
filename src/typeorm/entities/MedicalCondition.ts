import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'medicalCondition' })
export class MedicalCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
