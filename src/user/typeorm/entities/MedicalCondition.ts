import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class MedicalCondition{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}