import { getManager } from "typeorm";
import { Comment } from "../entity/Comment";
import { Role } from "../entity/Role";
import { User } from "../entity/User";

export class UserController {
    private entityManager: any;
    private user: User;

    constructor(user: User) {
        this.entityManager = getManager();
        this.user = user;
    }

    // everybody
    async getComments() {
        const comments = await this.entityManager.find(Comment);
        return comments;
    }

    // user, admin
    async addComment(text: string) {

        const comment = new Comment();
        comment.text = "comment test";
        await this.entityManager.save(comment);

        const user = await this.entityManager.findOne(User, { where: { id: this.user.id } })
        user.comments = [comment];
        await this.entityManager.save(user);

        return comment;
    }

    // user
    async deleteComment (commentId: number) {

    }

    // moderator, admin
    async deleteUserComment (commentId: number, userId: number) {}


}

const isUser = () => {
    console.log(123)
}