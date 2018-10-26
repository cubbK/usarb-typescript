import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Role  {

    

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(type => User, user => user.role)
    users: User[];   
}
