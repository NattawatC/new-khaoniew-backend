import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Food } from './Food';

@Entity({ name: 'feedbacks' })
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'รอการรีวิว...'})
  review: string;

  @Column({default: 'ไม่ระบุ'})
  reviewBy: string;

  @Column({default: '0'})
  score: string;
}
