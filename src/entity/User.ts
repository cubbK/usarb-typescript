import { Person } from "./Person";
import { Comment } from "./Comment";
import { Entity, PrimaryGeneratedColumn, Column, getManager } from "typeorm";

@Entity()
export class User extends Person {

    async getComments() {
        const entityManager = getManager(); // you can also get it via getConnection().manager
        const comments = await entityManager.find(Comment);
        return comments;
    }

    async addComment(text) {
        const entityManager = getManager();
        const thisUser = await entityManager.findOne(User, { where: { id: this.id } })
        const thisUserId = thisUser.id;
        
        const comment = await entityManager.create(Comment, {
            text: text,
            person: thisUserId
        })
        entityManager.save(comment);
        console.log("added comment", comment);
        return comment;
    }

}