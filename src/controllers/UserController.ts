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
    @isUser("admin")
    async deleteComment (commentId: number) {

    }

    // moderator, admin
    async deleteUserComment (commentId: number, userId: number) {}

    getUser () {
      return this.user
    }
}

function isUser (userType: string) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const newDescriptor = Object.assign({}, descriptor);

    newDescriptor.value = function () {
      if(this.user.role.type == userType) {
        return descriptor.value.apply(this, arguments);
      } else {
        throw new Error(`User is  ${userType} instead of ${this.user.role.type}`);
      }
    }

    return newDescriptor;
  }
}