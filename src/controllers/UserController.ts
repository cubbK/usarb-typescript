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
  @isUser("user", "admin")
  async addComment(text: string) {
    const comment = new Comment();
    comment.text = text;
    await this.entityManager.save(comment);

    console.log(this.user)

    if (this.user.comments) {
      this.user.comments = [...this.user.comments, comment];
    } else {
      this.user.comments = [comment];
    }
    
    await this.entityManager.save(this.user);

    return comment;
  }

  // user
  @isUser("user")
  async deleteComment(commentId: number) {}

  // moderator, admin
  @isUser("moderator", "admin")
  async deleteUserComment(commentId: number, userId: number) {}
}

function isUser(...usersType: string[]) {
  return function(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const newDescriptor = Object.assign({}, descriptor);

    newDescriptor.value = function() {
      if (usersType.includes(this.user.role.type)) {
        return descriptor.value.apply(this, arguments);
      } else {
        throw new Error(
          `User is one of ${usersType} instead of ${this.user.role.type}`
        );
      }
    };

    return newDescriptor;
  };
}
