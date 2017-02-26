

/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , http    = require('http').Server(express())
  , io      = require('socket.io')(http);



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
 












