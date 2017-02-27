

/*      Dependencies
 ---------------------------------------------*/
//
// var express = require('express')
//   , http    = require('http').Server(express())
//   , io      = require('socket.io')(http.listen(2300));
//

 /**
 |======================================================================================
 |    Socket Module start here...
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
 












