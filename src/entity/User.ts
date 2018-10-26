import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, getManager } from "typeorm";
import { Comment } from "./Comment";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @ManyToOne(type => Role, role => role.users)
    role: Role;

}
