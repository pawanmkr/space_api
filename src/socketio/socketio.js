import chalk from 'chalk';
import { io } from '../app.js';

export class Socketio {
    static async joinNamespace(name) {
        const space = io.of(`/${name}`);
        space.on('connection', (socket) => {
            console.log(chalk.bgWhite.black(`New Connection NameSpace: ${space.name} Socket: ${socket.id}`));
            
            socket.on("messageFromClient", (msg) => {
                console.log(chalk.bgYellow.black(msg));
                space.emit("messageFromServer", msg);
            });
        })
        return space.name.slice(1);
    }
};










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