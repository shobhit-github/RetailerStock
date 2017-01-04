
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  
var User   = require(MODEL_ROOT+'users')
  , jade   = require(HELP_ROOT+'jade.compiler');



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
exports.checkAuth = function(req, res) {

  return res.status(200).json({ success: true, response: req.user });
};



/*
 |--------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------
 */
exports.signUp = function(req, res) {
  
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
exports.login = function(req, res) {


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
  })
};



/*
 |--------------------------------------------------
 | Reset password with email send
 |--------------------------------------------------
 */
exports.resetPassword = function(req, res) {

  var encryptedEmail = encrypt(req.body.email);

  User.findOne({email: req.body.email}, function(err, user) {
    
    if (!user) {
      return res.status(401).json({ success: false, message: msg.NOT_EXIST });
    }

     user.reset_link = SERVER_URI+'#/set-password/:'+encryptedEmail;

    jade.compile('reset_password', user, function (err, html) {
        if(err)
          return res.status(400).json({ success: false, message: msg.BAD_REQUEST });

      sendMail({ to:req.body.email, subject:'Reset Password',html:html}, function(err, resp) {  // check email sending status
        if(err) {
          return res.status(500).json({ success: false, message: msg.EMAIL_FAILED, description: err });
        }
        return res.status(200).json({ success: true, message: msg.EMAIL_SENT});
      });
    });

  }).select({password:0, picture:0, role:0, status:0, updated_at:0});
};





/*
 |--------------------------------------------------
 | Logout User
 |--------------------------------------------------
 */
exports.logout = function(req, res) {
  
  req.logout();
  
    res.status(200).json({
      'success':  true,
      'message':  msg.LOGOUT_SUCCESS
    });
};







