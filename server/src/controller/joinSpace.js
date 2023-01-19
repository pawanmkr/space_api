import { Space } from '../models/space.js';
import { User } from '../models/user.js'; 

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
        const user = await User.addUser(userName);
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