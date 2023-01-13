"use strict";

roomlist.forEach(function (room) {
  var socket = io(room.nameSpace);
  socket.on('connect', function (socket) {
    console.log("A client with Namespace: '".concat(room.nameSpace, "' has connected succesfully."));
  });
  createRoom(room.nameSpace);
  socket.emit('chatMessage', "vande bharat");
  console.log("vande bharat emitted from client");
}); //dom manipulation here

var roomTitleinRoomList = document.getElementById('room-title-in-room-list');
var roomTitleinMiddle = document.getElementById('room-title-in-middle');
var inputFieldinMiddle = document.getElementById('input-field-in-middle');
var sendBtninMiddle = document.getElementById('send-btn-in-middle');
var chatBox = document.getElementById('chat-box');

var createRoom = function createRoom() {
  console.log({
    roomTitleinMiddle: roomTitleinMiddle,
    roomTitleinRoomList: roomTitleinRoomList,
    inputFieldinMiddle: inputFieldinMiddle,
    sendBtninMiddle: sendBtninMiddle,
    chatBox: chatBox
  }); // roomTitleinRoomList.innerText = roomName;
  // roomTitleinMiddle.innerText = roomName;
};

createRoom();