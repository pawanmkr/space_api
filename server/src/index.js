const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"]
    }
});
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const player = require('play-sound')(opts = {});
const path = require('path');
const formatMessage = require('../utils/formatMessage');
const arrofRooms = require('./classes/room');
const roomCreaterFunction = require('./classes/room');

const clog = (msg) => {
    console.log(msg)
}

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.set('views', path.join(__dirname, '..', './views'));
app.set('view engine', 'pug');

const pathToPublicFolder = path.join(__dirname, '..', '/public');
app.use(express.static(pathToPublicFolder));

app.get('/', (req, res) => {
    res.render('index');
});

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server's up & running on http://localhost:4000/`);
    clog(arrofRooms.arrofRooms[0]);
})

//const io = socketio(expressServer);

app.post('/Chatboard', (req, res) => {
    // Get the form data from the request body
    arrofRooms.arrofRooms.push(
        roomCreaterFunction.createNewRoom(req.body.roomname, req.body.roomcapacity)
    );
    createNamespace(req.body.roomname);
    res.render('chatroom', {
        room: req.body.roomname
    });
});

let chatMessage = 'default chat message';


app.post('/chatmessage', (req, res) => {

});

async function createNamespace(roomname) {
    const nameSpace = io.of(`/${roomname}`);
    await nameSpace.on('connection', (socket) => {
        clog(`${socket.id} has connected in ${roomname}`);

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

module.exports = clog;