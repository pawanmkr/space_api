import chalk from "chalk";
import crypto from "crypto";
import { spaces } from "../socketio/socketio.js";
import socketio from "../socketio/socketio.js";
import { Space } from "../models/space.js";
import { User } from "../models/user.js";
import { Junction } from "../models/junctionTable.js";
import { resolve } from "path";

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
        const spaceMetadata = { fake: "metadata" };
        const user = await User.addUser(username, spaceShareId);
        const space = await Space.addSpace(spaceShareId, name, user.id, spaceMetadata);
        await Junction.addJunction(user.id, space.id);
        const extractedData = {
            userName: user.username,
            userJoinedAt: user.joined_at,
            shareableSpaceId: space.id,
            spaceName: space.name,
            spaceCreatedAt: space.created_at,
            spaceMaxCapacity: space.capacity,
        };
        return extractedData;
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

