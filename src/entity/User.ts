import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  getManager,
  JoinTable
} from "typeorm";
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

  @ManyToOne(type => Role, role => role.users, {
    eager: true
  })
  role: Role;
}
