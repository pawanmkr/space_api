import chalk from "chalk";
import crypto from "crypto";
import { arrofRooms } from "../classes/roomClass.js";
import { createNewRoom } from "../classes/roomClass.js";
import { spaces } from "../socketio/socketio.js";
import socketio from "../socketio/socketio.js";
//import { addSpace } from "../models/spaceModel.js";
import { User } from "../models/user.js";

function generateUID() {
  return crypto.randomBytes(5).toString('hex');
}

export default async function joinNamespace(req, res) {
    try {
        const { name } = req.params;
        const { username } = req.body;
        console.log(`name: ${name}, username: ${username}`);

        //const spaceMetadata = socketio(name);

        const newUser = await User.addUser(username, 1);
        const spaceId = generateUID();
        // create addSpace function in space model
        //addSpace(spaceId, spaceName, userId, createdAt, capacity, spaceMetadata);
        res.sendStatus(501);
        res.json({
            Status: 200,
            Message: `${username} joined ${name} successfully`,
        });
    } catch (error) {
        console.log(`error while joining space in server/controller/joinNamespace.js`);
        console.log(chalk.bgRed.white.bold(`ERROR >>> ${error.detail}`));
        res.sendStatus(501);
        res.json({
            Error: error,
            Status: 501,
            Message: `error while joining space in server/controller/joinNamespace.js`,
        });
    }
}


// 2. get user_id from user_table


// after writing code ask chatgpt 'how can i improve my code?'