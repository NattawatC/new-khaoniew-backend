import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { MedicalCondition } from './MedicalCondition';

@Entity()
export class User {
  @PrimaryColumn()
  thaiId: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @ManyToMany(() => MedicalCondition)
  @JoinTable()
  medicalconditions: MedicalCondition[];
}
