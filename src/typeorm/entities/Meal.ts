import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Patient } from './Patient';
import { Food } from './Food';
import { Feedback } from './Feedback';
import { blob } from 'stream/consumers';

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

  @Column({type: 'longblob'})
  image: Buffer;

  @ManyToOne(() => Patient, (patient) => patient.meals)
  patient: Patient;

  @OneToOne(() => Food)
  @JoinColumn()
  food: Food;

  @OneToOne(() => Feedback)
  @JoinColumn()
  feedback: Feedback;
}
