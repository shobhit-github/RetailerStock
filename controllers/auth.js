
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require(config.CONF_DIR+'messages');
  
var router = express.Router();
var User   = require(config.MODEL_DIR+'users');

var app   = express()
  , twilio = require('twilio')
  , client = twilio('ACe035de026484641307a00abf53dcce0a', '0da3d8e0e3109a423728a2dfa1c0c3ca')
  , help  = require(config.CONF_DIR+'helpers');
  
var methods = new Object();



/**
 |======================================================================================
 |    Authentication Module start here... 
 |======================================================================================
 */



  
/*
 |--------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------
 */
methods.checkAuth = function(req, res) {

  //client.sendMessage( { to:'+917837098699', from:'+14698282295', body:'NodeJS Test SMS Gateway by Shobhit Sharma' }, function( err, data ) {

    if(err) console.log(err);
    else console.log(data);
  });
  return res.status(200).json({ success: true, response: req.user });
};



/*
 |--------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------
 */
methods.signUp = function(req, res) {
  
  User.findOne({ email: req.body.email }, function(err, existingUser) {
    
    var profile = new User(req.body);
    
    if (existingUser) {
      return res.status(409).json({ success: false, message: msg.ALREADY_EXIST });
    }
    
    profile.save(function(err, result) {
      if (err) {
        return res.status(500).json({ success:false, message: err.message });
      }
      
        return res.status(200).json({
          success: true, 
          message: msg.REGISTERATION_DONE,
          token: help.createJWT(result)
        });      
    });
    
  });
};



/*
 |--------------------------------------------------
 | Log in with Email
 |--------------------------------------------------
 */
methods.login = function(req, res) {


  User.findOne({ username: req.body.username }, function(err, user) {
    if (!user) {
      return res.status(401).json({ success: false, message: msg.NOT_EXIST });
    }
    
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).json({  success: false, message: msg.INCORRECT_PASSWORD });
      }
      
      return res.status(200).json({ success: true, message:msg.LOGIN_SUCCESS, token: "JWT "+ help.createJWT(user) });
    });
  });
};



/*
 |--------------------------------------------------
 | Reset password with email send
 |--------------------------------------------------
 */
methods.resetPassword = function(req, res) {

  var encryptedEmail = help.encrypt(req.body.email);

  var isSent = function(resp) {  // check email sending status

    if(!resp) {
      return res.status(500).json({ success: false, message: msg.EMAIL_FAILED });
    }
    return res.status(200).json({ success: true, message: msg.EMAIL_SUCCESS });
  };
  
  
  User.count({email: req.body.email}, function(err, user) {
    
    if (!user) {
      return res.status(401).json({ success: false, message: msg.NOT_EXIST });
    }
    help.sendMail({
      from    :   'rsaloneboy@gmail.com',
      to      :   req.body.email,
      subject :   'Reset Password',
      html    :   '<a href="'+config.SERVER_URI+encryptedEmail+'" target="_BLANK">SET NEW PASSWORD</a>'
    }, isSent );

  })
};





/*
 |--------------------------------------------------
 | Logout User
 |--------------------------------------------------
 */
methods.logout = function(req, res) {
  
  req.logout();
  
    res.status(200).json({
      'success':  true,
      'message':  msg.LOGOUT_SUCCESS
    });
};







module.exports = methods;
