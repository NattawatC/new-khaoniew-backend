import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Meal } from './Meal';
import { MedicalCondition } from './MedicalCondition';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryColumn()
  thaiId: number;

  @Column({ default: '' })
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  healthRiskScore: number;

  @ManyToMany(() => MedicalCondition)
  @JoinTable()
  medicalConditions: MedicalCondition[];

  @OneToMany(() => Meal, (meal) => meal.patient)
  meals: Meal[];
}
