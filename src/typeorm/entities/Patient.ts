import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Meal } from './Meal';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({default: ''})
  medicalCondition: string;

  @Column()
  healthRiskScore: number;

  @OneToMany(() => Meal, (meal) => meal.patient)
  meals: Meal[];

}
