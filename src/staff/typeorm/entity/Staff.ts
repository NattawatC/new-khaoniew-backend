import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Staff{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    password: string;

}