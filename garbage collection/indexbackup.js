//save it for later
/* async function establishConnection() {
    io.on('connection', (socket) => {
        log(`${socket.id} has connected`);
        socket.on("joinRoom", (roomname) => {
            socket.join(roomname);
         nameSpaces[roomname] = socket;
            console.log nameSpaces);
        });
        socket.on("chatMessageForServer", (msg) => {
            console.log(msg);
            //add msg to db
            io.to(msg.roomname).emit('chatMessageForClient', msg);
        });
        socket.on("disconnecting", (reason) => {
            console.log(reason);
        });
    });
} */



//my logic for chatroom but i used another in index.js that seems better that this one
let chatMessage = 'default chat message';

app.post('/chatmessage', (req, res) => {

});

async function createNamespace(roomname) {
    const nameSpace = io.of(`/${roomname}`);
    await nameSpace.on('connection', (socket) => {
        log(`${socket.id} has connected in ${roomname}`);

        socket.on("chatMessageForServer", (msg) => {
            console.log(msg);
            //add msg to db
            nameSpace.emit('chatMessageForClient', msg);
        });
        socket.on("disconnecting", (reason) => {
            console.log(reason);
        });
    });
};

//the better logic i told above
await io.of(/^\/\w+$/).on('connection', async (socket) => {
    const workspace = socket.nsp;
    const namespace = workspace.name;
    console.log("New Connection NameSpace", namespace, socket.id);
    socket.emit('sendFromServer', `Hello from server but outer part: ${socket.id}`);

    // you can test here if "namespace" is allowed to be used
    // if event handlers are set no need to got further
    if (nameSpaces[namespace]) return;

    // save workspace to prevent setting event handlers on each connection
    nameSpaces[namespace] = workspace;        
    await workspace.on("connection", (socket) => {
        console.log(`${namespace} > connection from ${socket.id}`);
        // set the event handlers same as normal socket
        socket.on('event', (msg) => {
            console.log("event", msg);
            workspace.emit('event', msg);
        })

        socket.on('disconnect', (reason) => {
            console.log(`${namespace}/${socket.id} > disconnected due to: ${reason}`);
        });
    })
})
