import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
