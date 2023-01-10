import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { URL } from "url";
import http from 'http';
import socketRoutes from "../routes/socketRoutes.js";
import { io } from "../socketio/socketio.js";
import createTables from "../controller/createTables.js";
import cors from 'cors'

//const player = require('play-sound')(opts = {});

const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
const pathToPublicFolder = path.join(__dirname, '..', '/public');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(pathToPublicFolder));

app.set('views', path.join(__dirname, '..', './views'));
app.set('view engine', 'pug');

// createTables();

app.use('/', socketRoutes);

app.use('/chatboard', socketRoutes);

app.use('/namespace', socketRoutes);

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server's up & running on http://localhost:4000/`);
})

io(server);

export default app;