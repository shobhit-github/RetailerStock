
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require('../config/messages');
  
var router = express.Router();
var User   = require('../models/users');

var app   = express()
  , help  = require('../config/helpers');
  
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

console.log(req.body);
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
  
  var isSent = function(res) {  // check email sending status
    if(!res) {
      res.status(200).json({ success: false, message: msg.EMAIL_FAILED });
    }
    res.status(200).json({ success: true, message: msg.EMAIL_SUCCESS });
  };
  
  
  User.count({email: req.body.email}, function(err, user) {
    
    if (!user) {
      return res.status(401).json({ success: false, message: msg.NOT_EXIST });
    }
    
    help.sendEmail({
      'from'    :   'shobhit.musiclover.sharma1@gmail.com',
      'to'      :   req.body.email,
      'subject' :   'Reset Password',
      'html'    :   '<a href="'+config.CLIENT_URI+encryptedEmail+'" target="_BLANK">SET NEW PASSWORD</a>'
    }, isSent );
    
  })
};





/*
 |--------------------------------------------------
 | Logout User
 |--------------------------------------------------
 */
methods.logout = function(req, res){
  
  req.logout();
  
    res.status(200).json({
      'success':  true,
      'message':  msg.LOGOUT_SUCCESS
    });
};







module.exports = methods;
