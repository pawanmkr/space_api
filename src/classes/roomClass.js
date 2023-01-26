import { v4 as uuid } from 'uuid';
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

export const arrofRooms = [];
export const createNewRoom = (roomTitle, roomCapacity) => {
    //generate roomId for sharing
    const roomId = uuid().replace(/-/g, '').substring(0, 5);

    arrofRooms.push(new Room(roomId, roomTitle, roomCapacity, roomId));
};