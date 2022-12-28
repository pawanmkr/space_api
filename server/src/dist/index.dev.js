"use strict";

var express = require('express');

var app = express();

var socketio = require('socket.io');

var userRoutes = require('./routes/user');

var bodyParser = require('body-parser');

var player = require('play-sound')(opts = {});

var path = require('path');

var formatMessage = require('../utils/formatMessage');

var arrofRooms = require('./classes/room');

var roomCreaterFunction = require('./classes/room');

var clog = function clog(msg) {
  console.log(msg);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('views', path.join(__dirname, '..', './views'));
app.set('view engine', 'pug');
var pathToPublicFolder = path.join(__dirname, '..', '/public');
app.use(express["static"](pathToPublicFolder));
app.get('/', function (req, res) {
  res.render('index');
});
app.post('/form', function (req, res) {
  // Get the form data from the request body
  arrofRooms.arrofRooms.push(roomCreaterFunction.createNewRoom(req.body.roomname, req.body.roomcapacity));
  clog(arrofRooms.arrofRooms);
  res.render('chatroom', {
    arrofRooms: arrofRooms.arrofRooms
  });
});
var expressServer = app.listen(process.env.PORT || 4000, function () {
  console.log("Server's up & running on http://localhost:4000/");
});
var io = socketio(expressServer); // io.on("connection", (socket) => {
//     console.log(`connected from server side with socketId: ${socket.id}`);
//     socket.emit('roomList', allRooms);
// });

arrofRooms.arrofRooms.forEach(function (room) {
  io.of("".concat(room.nameSpace)).on('connection', function (socket) {
    clog("".concat(room.nameSpace, " has connected."));
    socket.on('chatMessage', function (msg) {
      console.log("chatMessage from Client says ".concat(msg));
    });
  });
});
module.exports = clog;