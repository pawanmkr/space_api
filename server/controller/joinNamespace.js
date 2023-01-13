import chalk from "chalk";
import crypto from "crypto";
import { spaces } from "../socketio/socketio.js";
import socketio from "../socketio/socketio.js";
import { Space } from "../models/space.js";
import { User } from "../models/user.js";
import { Junction } from "../models/junctionTable.js";

function generateUID() {
    return crypto.randomBytes(5).toString('hex');
}

function generateIntUID() {
    return parseInt(crypto.randomBytes(5).toString('hex'), 16) % Math.pow(10, 6);
}

export default async function joinNamespace(req, res) {
    try {
        const { name } = req.params;
        const { username } = req.body;
        console.log(`name: ${name}, username: ${username}`);

        //const spaceMetadata = socketio(name);
        const spaceShareId = generateIntUID();
        const spaceMetadata = { fake: "metadata" };
        const userId = await User.addUser(username, spaceShareId);

        const spaceId = await Space.addSpace(spaceShareId, name, userId, spaceMetadata);
        await Junction.addJunction(userId, spaceId);
    } catch (error) {
        console.log(chalk.bgRed.white.bold(
            "error while joining space in server/controller/joinNamespace.js"
        ));
        console.log(error);
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