const uuid = require('uuid');
//the socket.io offers both namespace and room but in my case i don't rooms
//namespace is enough for this specific app so i will not be using room
//and i'll namespace directly as room
class Room {
    constructor(roomId, roomTitle, roomCapacity, nameSpace, privateRoom = false) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.roomCapacity = roomCapacity;
        this.roomChatHistory = [];
        this.nameSpace = `/${nameSpace}`;
    }

    addMessage(message) {
        this.roomChatHistory.push(message);
    }
    clearHistory() {
        this.roomChatHistory = [];
    }
}

const createNewRoom = (roomTitle, roomCapacity) => {
    //generate roomId for sharing
    const roomId = uuid.v4().replace(/-/g, '').substring(0, 5);
    return new Room(roomId, roomTitle, roomCapacity, roomId);
}

const arrofRooms = [];

exports.arrofRooms = arrofRooms;
exports.createNewRoom = createNewRoom;

// module.exports = {
//     arrofRooms,
//     createNewRoom
// };