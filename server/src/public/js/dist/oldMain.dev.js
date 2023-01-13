// const socket = io();
// const form = document.getElementById('form');
// const messageBody = document.querySelector('.messages');
// //output message to DOM
// const outputMessage = (message) => {
//     const list = document.createElement('li');
//     list.classList.add('list-item');
//     list.innerHTML = `
//         <p class="meta"> ${message.username} <span> ${message.time} </span> </p>
//         <P class="text">${message.text}</P>
//     `;
//     document.getElementById('msg-list').appendChild(list);
// }
// socket.on('message', (message) => {
//     console.log("send by the server: " + message.text);
//     outputMessage(message);
//     //scroll to top
//     messageBody.scrollTop = messageBody.scrollHeight;
// });
// //listening for submit event when user will send chat
// form.addEventListener('submit', (event) => {
//     event.preventDefault()
//     //catching chat-message from the input box
//     const chatMessageBox = document.getElementById('msg');
//     const chatMessage = chatMessageBox.value;
//     //emitting chatMessage to server
//     socket.emit('sendChatMessage', chatMessage);
//     //clear input box and focus
//     chatMessageBox.value = "";
//     chatMessageBox.focus();
// });
"use strict";