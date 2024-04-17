import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Patient } from './Patient';
import { Food } from './Food';
import { Feedback } from './Feedback';
import { Image } from './Images';

@Entity({ name: 'meals' })
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mealTime: string;

  @Column()
  date: Date;

  @Column({ default: false })
  reviewStatus: boolean;

  @ManyToOne(() => Patient, (patient) => patient.meals)
  patient: Patient;

  @OneToOne(() => Food)
  @JoinColumn()
  food: Food;

  @OneToOne(() => Feedback)
  @JoinColumn()
  feedback: Feedback;

  @ManyToOne(() => Image) // Define the relationship with Image entity
  @JoinColumn()
  image: Image;
}
