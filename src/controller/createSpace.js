import chalk from "chalk";
import crypto from "crypto";
import { Socketio } from "../socketio/socketio.js";
import { Space } from "../models/space.js";
import User from "../models/user.js";
import { Junction } from "../models/junctionTable.js";
import { resolve } from "path";
import extractData from "../utils/extractData.js";

function generateUID() {
    return crypto.randomBytes(5).toString('hex');
}

function generateIntUID() {
    return parseInt(crypto.randomBytes(5).toString('hex'), 16) % Math.pow(10, 6);
}

async function ifEmpty(id, user) {
    if (id === undefined) {
        console.log(`name is missing: ${id}`);
        throw new Error(`Error: id is missing, id: ${id} cannot be processed`);
    }
    if (user === undefined) {
        console.log(`username is missing: ${user}`);
        throw new Error(`Error: user is missing, user: ${user} cannot be processed`);
    }    
};

export default async function createSpace(req, res) {
    try {
        const name = req.body.name;
        const username = req.body.username;
        await ifEmpty(name, username);
        const spaceShareId = generateIntUID();

        const spaceName = await Socketio.joinNamespace(name);
        const user = await User.addUser(username);
        const space = await Space.addSpace(spaceShareId, spaceName);
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

