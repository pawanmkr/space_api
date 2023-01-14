import chalk from "chalk";
import crypto from "crypto";
//import { spaces } from "../socketio/socketio.js";
import { Socketio } from "../socketio/socketio.js";
import { Space } from "../models/space.js";
import { User } from "../models/user.js";
import { Junction } from "../models/junctionTable.js";
import { resolve } from "path";
import extractData from "../utils/extractData.js";

function generateUID() {
    return crypto.randomBytes(5).toString('hex');
}

function generateIntUID() {
    return parseInt(crypto.randomBytes(5).toString('hex'), 16) % Math.pow(10, 6);
}

export default async function joinSpace(req, res) {
    try {
        const { name } = req.params;
        const { username } = req.body;
        const spaceShareId = generateIntUID();

        const spaceName = await Socketio.joinNamespace(name);
        const user = await User.addUser(username, spaceShareId);
        const space = await Space.addSpace(spaceShareId, spaceName, user.id);
        await Junction.addJunction(user.id, space.id);

        return extractData(user, space);
    } catch (error) {
        console.log(chalk.bgRed.white.bold("error while joining space in server/controller/joinNamespace.js"));
        console.log(error);
        res.status(501).json({
            Error: error.message,
            Status: 501,
            Message: `error while joining space in server/controller/joinNamespace.js`,
        });
    }
}

// after writing code ask chatgpt 'how can i improve my code?'

