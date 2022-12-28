"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuid = require('uuid'); //the socket.io offers both namespace and room but in my case i don't rooms
//namespace is enough for this specific app so i will not be using room
//and i'll namespace directly as room


var Room =
/*#__PURE__*/
function () {
  function Room(roomId, roomTitle, roomCapacity, nameSpace) {
    var privateRoom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, Room);

    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.roomCapacity = roomCapacity;
    this.roomChatHistory = [];
    this.nameSpace = "/".concat(nameSpace);
  }

  _createClass(Room, [{
    key: "addMessage",
    value: function addMessage(message) {
      this.roomChatHistory.push(message);
    }
  }, {
    key: "clearHistory",
    value: function clearHistory() {
      this.roomChatHistory = [];
    }
  }]);

  return Room;
}();

var createNewRoom = function createNewRoom(roomTitle, roomCapacity) {
  //generate roomId for sharing
  var roomId = uuid.v4().replace(/-/g, '').substring(0, 5);
  return new Room(roomId, roomTitle, roomCapacity, roomId);
};

var arrofRooms = [];
exports.arrofRooms = arrofRooms;
exports.createNewRoom = createNewRoom; // module.exports = {
//     arrofRooms,
//     createNewRoom
// };