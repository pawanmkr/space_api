import chalk from 'chalk';

export default async function joinSpace(req, res) {
    try {
        /* in switch function i assume the user is already associated with spaces that 
        he/she has joined already and now just want to load chats of that space
        so the function will accept the space_share_id and only return the saved 
        chats for particular space, */
        /* 
            todo: write query to retrieve chats from db in models/conversation.js
                    then call the query in this function...
         */
    } catch (error) {
        console.log(chalk.bgRed.white.bold("error while retrieving chats in server/controller/switchSpace.js"));
        console.log(error);
        res.status(404).json({
            Error: error.message,
            Status: 404,
            Message: `error while retrieving chats in server/controller/switchSpace.js`,
        });
    }
}