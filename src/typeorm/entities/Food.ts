import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Image } from './Images';

@Entity({name: 'foods'})
export class Food{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 0})
    carbs: number;

    @Column({default: '0'})
    score: string;

    // @OneToOne(() => Image)
    // @JoinColumn()
    // image: Image;
}
