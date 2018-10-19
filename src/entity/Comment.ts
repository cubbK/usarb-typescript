import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Person} from "./Person";

@Entity()
export class Comment  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => Person, person => person.comments)
    person: Person;   
}
