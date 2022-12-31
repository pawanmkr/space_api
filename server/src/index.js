const express = require('express');
const app = express();
const socketio = require('socket.io');

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

app.post('/Chatboard', (req, res) => {
    // Get the form data from the request body
    arrofRooms.arrofRooms.push(
        roomCreaterFunction.createNewRoom(req.body.roomname, req.body.roomcapacity)
    );
    res.render('chatroom', {
        arrofRooms: arrofRooms.arrofRooms
    });
});

const openroom = () => {
    var endpoints = [];
    arrofRooms.arrofRooms.forEach((room) => {
        endpoints.push(room.roomTitle);
    })
    console.log(endpoints)

    app.post(endpoints, (req, res) => {
        res.render('chatroom', {
            roomtitle: roomTitle
        })
    });
}

const expressServer = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server's up & running on http://localhost:4000/`);
})

const io = socketio(expressServer);

// io.on("connection", (socket) => {
//     console.log(`connected from server side with socketId: ${socket.id}`);
//     socket.emit('roomList', allRooms);
// });

// arrofRooms.arrofRooms.forEach((room) => {
//     io.of(`${room.nameTitle}`).on('connection', (room) => {
//         clog(`${room.nameTitle} has connected.`);
//         //openroom();

//         socket.on('chatMessage', (msg) => {
//             console.log(`chatMessage from Client says ${msg}`);
//         });
//     });
// });

io.of('/pawan').on('connection', (socket) => {
    clog(`pawan has connected.`);
    //openroom();

    socket.on('chatMessage', (msg) => {
        console.log(`chatMessage from Client says ${msg}`);
    });
});

module.exports = clog;