import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/UserController"
import { User } from "./entity/User";

createConnection().then(async connection => {

    const user = await connection.manager.findOne(User, { where: { id: 1 } });

    const userController = new UserController(user);


}).catch(error => console.log(error));
