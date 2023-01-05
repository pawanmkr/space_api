import { Server } from 'socket.io';

export function io(server) {
    io = new Server(server, {
        cors: {
          origin: "http://localhost:4000",
          methods: ["GET", "POST"]
        }
    });
}

// to store metadata of namespaces
export const nameSpaces = [];

export default async function socketio(name) {
    await io.of(/^\/\w+$/ || name).on('connection', async (socket) => {
        const namespaceMetadata = socket.nsp;
        const namespace = namespaceMetadata.name;
        console.log("New Connection NameSpace", namespace, socket.id);

        socket.on('confirmation', msg => {
            namespaceMetadata.emit('confirmation', msg);
        });

        if (nameSpaces[namespace]) { return; }
        else {
            nameSpaces[namespace] = namespaceMetadata;
        }

        await namespaceMetadata.on("connection", (socket) => {
            console.log(`${namespace} > connection from ${socket.id}`);
            // set the event handlers same as normal socket
            socket.on('chatMessageForServer', (msg) => {
                console.log(msg);
                namespaceMetadata.emit('chatMessageForClient', msg);
            })

            socket.on('disconnect', (reason) => {
                console.log(`${namespace}/${socket.id} > disconnected due to: ${reason}`);
            });
        })
    })
};