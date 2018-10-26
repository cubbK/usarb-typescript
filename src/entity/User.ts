import {Entity, PrimaryGeneratedColumn, Column, OneToMany, getManager } from "typeorm";
import {Comment} from "./Comment";

@Entity()
export  class User {

    entityManager: any;

    constructor () {
        this.entityManager = getManager();
    }
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    async getComments() {
        const comments = await this.entityManager.find(Comment);
        return comments;
    }

    async addComment(text) {
        

        const comment = new Comment();
        comment.text = "comment test";
        await this.entityManager.save(comment);

        const user = await this.entityManager.findOne(User, { where: { id: this.id } })
        user.comments = [comment];
        await this.entityManager.save(user);

        return comment;
    }
}
