roomlist.forEach((room) => {
  const socket = io(room.nameSpace);

  socket.on('connect', (socket) => {
    console.log(`A client with Namespace: '${room.nameSpace}' has connected succesfully.`);
  });

  createRoom(room.nameSpace);

  socket.emit('chatMessage', "vande bharat");
  console.log("vande bharat emitted from client");
});


//dom manipulation here
const roomTitleinRoomList = document.getElementById('room-title-in-room-list');
const roomTitleinMiddle = document.getElementById('room-title-in-middle');
const inputFieldinMiddle = document.getElementById('input-field-in-middle');
const sendBtninMiddle = document.getElementById('send-btn-in-middle');
const chatBox = document.getElementById('chat-box');

const createRoom = () => {
  console.log({
    roomTitleinMiddle,
    roomTitleinRoomList,
    inputFieldinMiddle,
    sendBtninMiddle,
    chatBox
  })
  // roomTitleinRoomList.innerText = roomName;
  // roomTitleinMiddle.innerText = roomName;
}
createRoom();