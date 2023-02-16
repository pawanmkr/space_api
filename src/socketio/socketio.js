import chalk from 'chalk';
import formatMessage from '../utils/formatMessage.js';
import { io } from '../app.js';
import User from '../models/user.js'
import Conversation from '../models/conversation.js'
import Attachment from '../models/attachment.js'
import { savetoS3 } from '../controller/handleS3.js';
import handleError from '../utils/handleError.js';

export class Socketio {
    static async joinNamespace(name) {
        const space = io.of(`/${name}`);
        space.on('connection', (socket) => {
            console.log(chalk.bgWhite.black(`New Connection NameSpace: ${space.name} Socket: ${socket.id}`));
            
            socket.on("messageFromClient", async (msg) => {
                const userId = await User.findUserbyUsername(msg.username);
                const addMessage = await Conversation.addMessage(msg.spaceId, userId, msg.message, null);
                const message = await formatMessage(addMessage, msg);
                space.emit("messageFromServer", msg);
            });

            /* file: {
                actualFile: dna.mp3,
                name: "dna",
                format: "mp3",
                size: 100mb,
                ----------------
                sender: username,
                space: spaceId
            } */
            socket.on("fileFromClient", async (file) => {
                try {
                    const uploadedFile = await savetoS3(file)
                    const attachment = await Attachment.addAttachment(file, uploadedFile)
                    const userId = await User.findUserbyUsername(file.sender);
                    await Conversation.addMessage(file.space, userId, null, attachment.rows[0].id)
                    
                    const attachmentDetailsForClient = {
                        id: attachment.rows[0].id,  name: attachment.rows[0].name,
                        type: attachment.rows[0].type, size: attachment.rows[0].size
                    }
                    console.log(attachmentDetailsForClient)
                    space.emit("fileFromServer", attachmentDetailsForClient) // emit attachment details after saving on server
                } catch (error) {
                    handleError(error, "failed sending file back to client in socketio/socketio.js")
                }
            })
        })
        return space.name.slice(1);
    }
}













// to store metadata of namespaces
// export const spaces = [];

// export default async function socketio() {
//     await io.of(/^\/\w+$/).on('connection', async (socket) => {
//         const spaceMetadata = socket.nsp;
//         const space = spaceMetadata.name;
//         console.log("New Connection NameSpace", space, socket.id);

//         socket.on('confirmation', msg => {
//             spaceMetadata.emit('confirmation', msg);
//         });

//         if (spaces[space]) { return; }
//         else {
//             spaces[space] = spaceMetadata;
//         }

//         await spaceMetadata.on("connection", (socket) => {
//             console.log(`${space} > connection from ${socket.id}`);
//             // set the event handlers same as normal socket
//             socket.on('chatMessageForServer', (msg) => {
//                 console.log(msg);
//                 spaceMetadata.emit('chatMessageForClient', msg);
//             })

//             socket.on('disconnect', (reason) => {
//                 console.log(`${space}/${socket.id} > disconnected due to: ${reason}`);
//             });
//         })
//     })
//     return {
//         spaceMetadata,
//     };
// };