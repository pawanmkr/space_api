import { arrofRooms } from "../classes/roomClass.js";
import { createNewRoom } from "../classes/roomClass.js";
import { nameSpaces } from "../socketio/socketio.js";
import socketio from "../socketio/socketio.js";

export default function createNamespace(req, res) {
    const { name } = req.params;
    // create a new Socket.IO namespace with the given name
    /* io.of(name).on('connection', (socket) => {
      console.log(`Connected to ${name} namespace!`);
    }); */
    socketio(name);
    res.send({ name: name });
}