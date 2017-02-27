

/*      Dependencies
 ---------------------------------------------*/

// var server = require('../bin/www')
//   , io      = require('socket.io').listen(server);




 /**
 |======================================================================================
 |    Notification Module start here...
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Retrieve all Users
 |--------------------------------------------------
 */

 exports.customerAdded = function (data) {

     io.on('connection', function(socket) {
         socket.emit('customer-added', data);
     });
 };
 












