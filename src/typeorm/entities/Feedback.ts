import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'feedbacks' })
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'รอการรีวิว...'})
  review: string;

  @Column({default: 'ยังไม่ระบุ'})
  reviewBy: string;
}
