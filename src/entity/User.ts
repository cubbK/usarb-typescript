import { Person } from "./Person";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends Person {
  
}