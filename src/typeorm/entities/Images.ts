import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('longblob')
    data: Buffer;
}
