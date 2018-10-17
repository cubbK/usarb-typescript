import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
