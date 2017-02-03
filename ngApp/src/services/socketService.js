
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.service('$socket', ['SERVER_URL',
  function (SERVER_URL) {

    console.log(io);
  const socket = io.connect(SERVER_URL+'noti');

    console.log(socket);

  this.on = function (eventName, callback) {
    //socket.on(eventName, callback);
  };
    
  this.emit = function (eventName, data) {
    //socket.emit(eventName, data);
  };


}]);

