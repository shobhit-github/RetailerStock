/*      Dependencies
 ---------------------------------------------*/

var express = require('express');

var User = require(MODEL_ROOT + 'users')
    , Chat = require(MODEL_ROOT + 'chats');


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
exports.chatList = function (req, res) {


    var conditions = {$and : [ {status: {login: "YES"}}, {$or: [{role: {$ne: "Administrator"}}, {_id: {$ne: req.user._id}}]}]};
    var options = {_id:1, firstname:1, lastname:1, picture:1}; // specific fields to be show ;

    User.find(conditions, options, function (err, result) {

        if(err)
            return res.status(500).json({status:false, message: msg.INTERNAL_ERROR, description: err});

        if (result.total == 0)
            return res.status(200).json({status:true, message: msg.NO_RECORD, data: result});

        return res.status(200).json({success: true, response: result});
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
        if (err)
            return console.log(err);

        console.log(res);
    });
};








