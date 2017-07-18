/*      Dependencies
 ---------------------------------------------*/

var express = require('express');
var config  = require(CONF_ROOT+'config');


var User = require(MODEL_ROOT + 'users')
  , Chat = require(MODEL_ROOT + 'chats');






/**
 |======================================================================================
 |    Chat Module start here...
 |======================================================================================
 */


var messageStatus = function (data, status, callback) {

    config.PUBNUB.publish({
        channel:'chat:message_status:'+status,
        message:data
    }, function (status, response) {

        callback(status, response);
    })

};



/*
 |--------------------------------------------------
 | Retrieve all Users
 |--------------------------------------------------
 */
exports.chatList = function (req, res) {

    var conditions = {$and : [ {status: {login: "YES"}}, {_id: {$ne: req.user._id}}]};
    var options = {_id:1, firstname:1, lastname:1, picture:1}; // specific fields to be show ;

    User.find(conditions, options, function (err, result) {

        if(err)
            return res.status(500).json({status:false, message: txt.INTERNAL_ERROR, description: err});

        if (result.total == 0)
            return res.status(200).json({status:true, message: txt.NO_RECORD, data: result});

        return res.status(200).json({success: true, response: result});
    })

};


/*
 |--------------------------------------------------
 | Saving Messages to database
 |--------------------------------------------------
 */

exports.saveMessage = function (req, res) {

    var chat = new Chat(req.body);

    chat.save(function (err, result) {

        // err = true;

        if (err) {
            messageStatus(req.body,'error',function (status, response) {
                res.status(500).json({success:false, message:msg.MESSAGE_FAILED, description:err});
            }); return;
        }

        messageStatus(req.body,'delivered',function (status, response) {

            res.status(200).json({success:true, message:msg.MESSAGE_SENT});
        })

    });
};


/*
 |--------------------------------------------------
 | Get messages by the users IDs
 |--------------------------------------------------
 */

exports.getMessages = function (req, res) {


    // Chat.find({})

};
