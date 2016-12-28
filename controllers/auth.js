
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , msg     = require(CONF_ROOT+'messages');
  
var User   = require(MODEL_ROOT+'users')
  , jade   = require(HELP_ROOT+'jade.compiler')
  , methods = new Object();



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
          token: createJWT(result)
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
      
      return res.status(200).json({ success: true, message:msg.LOGIN_SUCCESS, token: "JWT "+ createJWT(user) });
    });
  });
};



/*
 |--------------------------------------------------
 | Reset password with email send
 |--------------------------------------------------
 */
methods.resetPassword = function(req, res) {

  var encryptedEmail = encrypt(req.body.email);

  User.count({email: req.body.email}, function(err, user) {
    
    if (!user) {
      return res.status(401).json({ success: false, message: msg.NOT_EXIST });
    }


    jade.compile('reset_pass', new Object(), function (err, html) {
        if(err)
          return res.status(400).json({ success: false, message: msg.BAD_REQUEST });

      sendMail({ to:req.body.email, subject:'Reset Password',html:html}, function(resp) {  // check email sending status
        if(!resp) {
          return res.status(500).json({ success: false, message: msg.EMAIL_FAILED });
        }
        return res.status(200).json({ success: true, message: msg.EMAIL_SENT});
      });
    });


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
