import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/UserController";
import { User } from "./entity/User";

createConnection()
  .then(async connection => {
    const admin = await connection.manager.findOne(User, {
      where: { username: "admin1" }
    });
    const moderator = await connection.manager.findOne(User, {
      where: { username: "moderator1" }
    });
    const user = await connection.manager.findOne(User, {
      where: { username: "user1" }
    });

    const adminController = new UserController(admin);
    const moderatorController = new UserController(moderator);
    const userController = new UserController(user);

    await userController.deleteComment(37);

    const comments = await userController.getComments();
    console.log(comments);
  })
  .catch(error => console.log(error));
