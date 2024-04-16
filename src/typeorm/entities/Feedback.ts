import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Food } from './Food';

@Entity({ name: 'feedbacks' })
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'รอการรีวิว...'})
  review: string;

  @Column({default: 'ไม่ระบุ'})
  reviewBy: string;

  @ManyToOne(() => Food, (food) => food.carbs)
  carbs: Food;
}
