import crypto from "crypto";
import { arrofRooms } from "../classes/roomClass.js";
import { createNewRoom } from "../classes/roomClass.js";
import { spaces } from "../socketio/socketio.js";
import socketio from "../socketio/socketio.js";


function generateUID() {
  return crypto.randomBytes(5).toString('hex');
}

export default function createNamespace(req, res) {
    const { name, capacity } = req.params;
    const spaceMetadata = socketio(name);
    const spaceId = generateUID();

    // create addSpace function in space model
    addSpace(spaceId, spaceName, userId, createdAt, capacity, spaceMetadata);
    res.send({ name: name });
}


// 2. get user_id from user_table


// after writing code ask chatgpt 'how can i improve my code?'