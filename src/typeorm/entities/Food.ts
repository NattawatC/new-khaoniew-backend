import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'foods'})
export class Food{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    score: number;
}
