import chalk from 'chalk';
import { Space } from '../models/space.js';
import { User } from '../models/user.js'; 
import { Junction } from '../models/junctionTable.js';
import extractData from '../utils/extractData.js';
import { Socketio } from '../socketio/socketio.js';

async function ifEmpty(id, user) {
    if (!id || !user) {
        console.log(`something is missing: ${id} or ${user}`);
        throw new Error(`Error: id or user is missing, id: ${id}, user: ${user} cannot be processed`);
    }    
};

export default async function joinSpace(req, res) {
    console.log("enterd join func")
    const spaceId = req.body.id;
    const userName = req.body.username;
    await ifEmpty(spaceId, userName);
    try {
        const space = await Space.findSpacebyId(spaceId);
        if (!space) {
            res.status(404).json({Message: "there's no such space, check the id again"});
            return;
        }
        const spaceName = await Socketio.joinNamespace(space.rows[0].name);
        const user = await User.addUser(userName);
        await Junction.addJunction(user.id, space.rows[0].id);
        return extractData(user, space.rows[0]);
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