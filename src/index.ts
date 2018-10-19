import "reflect-metadata";
import {createConnection} from "typeorm";
import {Person} from "./entity/Person";
import {User} from "./entity/User"

createConnection().then(async connection => {

    const user = new User();
    user.username = "user1";
    user.password = "secret1";
    await connection.manager.save(user);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded persons: ", users);
     
    console.log("Here you can setup and run express/koa/any other framework.");
    
}).catch(error => console.log(error));
