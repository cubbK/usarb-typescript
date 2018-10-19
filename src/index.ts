import "reflect-metadata";
import { createConnection } from "typeorm";
import { Person } from "./entity/Person";
import { User } from "./entity/User"
import { Comment } from "./entity/Comment";

createConnection().then(async connection => {

    const user = await connection.manager.findOne(User, { where: { id: 1 } });

    const comments = await user.getComments();
    console.log(user);

    const newComment = await user.addComment("comment 1");

    
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded persons: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
