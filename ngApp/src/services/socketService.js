
'use strict';
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.service('$socket', ['$rootScope', '$sweetAlert', '$msg', 'SERVER_URL',
  function ($rootScope, $sweetAlert, $msg, SERVER_URL) {

  const socket = io.connect(SERVER_URL+'api/chat/');

      
  this.on = function (eventName, callback) {
    socket.on(eventName, function (r) {
      console.log(r);
    })  
  };
    
  this.emit = function (eventName, data, callback) {
    socket.emit(eventName, function (data) {
      
    })
  };


}]);

