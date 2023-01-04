import express from "express";
const app = express();
import http from "http";
import { Server } from 'socket.io';
import bodyParser from "body-parser";
import path from "path";
import userRoutes from "./routes/user.js";
import formatMessage from "../utils/formatMessage.js";
import { arrofRooms as arrofRooms } from './classes/roomClass.js';
import { createNewRoom as roomCreater } from './classes/roomClass.js';
import { URL } from "url";

//const player = require('play-sound')(opts = {});

const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
const pathToPublicFolder = path.join(__dirname, '..', '/public');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST"]
    }
});

function log(msg) {
    console.log(msg);
}

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.set('views', path.join(__dirname, '..', './views'));
app.set('view engine', 'pug');

app.use(express.static(pathToPublicFolder));

app.get('/', (req, res) => {
    res.render('index');
});

httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server's up & running on http://localhost:4000/`);
    roomCreater("tron", 100);
    log(arrofRooms);
})

const nameSpaces = [];

app.post('/chatboard', (req, res) => {
    // Get the form data from the request body
    arrofRooms.push(
        roomCreater(req.body.roomname, req.body.roomcapacity)
    );
    establishConnection();
    res.render('chatroom', {
        room: req.body.roomname
    });
});

async function establishConnection() {
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
};