import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { Meal } from './Meal';
import { MedicalCondition } from './MedicalCondition';
import * as bcrypt from "bcrypt";

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryColumn()
  thaiId: string;

  @Column({ default: '' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
  }

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

  @Column({ nullable: true })
  healthRiskScore: number | null;

  @ManyToMany(() => MedicalCondition)
  @JoinTable()
  medicalConditions: MedicalCondition[];

  @OneToMany(() => Meal, (meal) => meal.patient)
  meals: Meal[];
}
