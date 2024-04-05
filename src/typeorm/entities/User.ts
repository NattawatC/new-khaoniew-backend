import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { MedicalCondition } from './MedicalCondition';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
  medicalConditions: MedicalCondition[];
}
