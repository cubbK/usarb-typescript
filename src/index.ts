import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./models/User"
import { Comment } from "./models/Comment";

createConnection().then(async connection => {

    const user = await connection.manager.findOne(User, { where: { id: 1 } });

    

    const newComment = await user.addComment("comment 1");

    const comments = await user.getComments();
    console.log(comments);
    
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded persons: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
