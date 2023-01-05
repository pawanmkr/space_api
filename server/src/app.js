import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { URL } from "url";
import http from 'http';
import socketRoutes from "../routes/socketRoutes.js";
import { io } from "../socketio/socketio.js";

//const player = require('play-sound')(opts = {});

const __dirname = decodeURI(new URL('.', import.meta.url).pathname);
const pathToPublicFolder = path.join(__dirname, '..', '/public');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(pathToPublicFolder));

app.set('views', path.join(__dirname, '..', './views'));
app.set('view engine', 'pug');

app.use('/', socketRoutes);

app.use('/chatboard', socketRoutes);

app.use('/namespace', socketRoutes);

app.get('/loaderio-cd4debf78fbcf958ec0b461ad0fca78f', (req, res) => {
    res.sendFile(path.join(__dirname, './loaderio-cd4debf78fbcf958ec0b461ad0fca78f.txt'));
});

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server's up & running on http://localhost:4000/`);
    console.log(1);
})

io(server);

export default app;