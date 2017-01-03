
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , socket  = require('socket.io');

var User = require(MODEL_ROOT+'users')
  , Chat = require(MODEL_ROOT+'chats');


 


 
 
 /**
 |======================================================================================
 |    Chat Module start here...
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Retrieve all Users
 |--------------------------------------------------
 */
exports.chatList = function() {
  
  var conditions = { $or: [ { role: { $ne: "Administrator" } }, { _id: { $ne: req.user._id } } ] };
  var options = { select : "_id firstname lastname picture" }; // specific fields to be show ;
  
  User.find(conditions, options, function(err, result) {
    
    if(result.total == 0) {
      return { message: msg.NO_RECORD, data: result };
    }
    
    return { data: result };
  })

};


/*
 |--------------------------------------------------
 | Saving Messages to database
 |--------------------------------------------------
 */
var saveMessage = function (data, callback) {

  var chat = new Chat(data);
  
  chat.save(function (err, res) {
    if(err)
      return console.log(err);

    console.log(res);
  });
};








