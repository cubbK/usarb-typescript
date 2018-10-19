import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Comment} from "./Comment";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Comment, comment => comment.person)
    comments: Comment[];
}
