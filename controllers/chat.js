
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , config = require('../config/config')
  , msg = require(config.CONF_DIR+'messages')
  , help = require(config.CONF_DIR+'helpers'); // helper functions
  
var router = express.Router()
  , User = require(config.MODEL_DIR+'users')
  , Chat = require(config.MODEL_DIR+'chats');

var app = express()
  , methods = new Object();

 


 
 
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
methods.chatList = function(req, res) {
  
  var conditions = { $or: [ { role: { $ne: "Administrator" } }, { _id: { $ne: req.user._id } } ] };
  var options = {
    'select' : "_id firstname lastname picture" // specific fields to be show
  };
  
  User.find(conditions, options, function(err, result) {
    
    if(result.total == 0) {
      return res.status(200).json({ success: true, message: msg.NO_RECORD, data: result });
    }
    
    return res.status(200).json({ success: true, data: result });
  })

};





module.exports = methods;
