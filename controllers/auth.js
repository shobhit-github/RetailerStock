
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , env  = require('node-env-file')('./.env')
  , request = require('request');
  
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
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
exports.facebook =  function(req, res) {

  var fields = '?fields=id,first_name,last_name,email,picture{url},gender';

  request.get({ url: process.env.FB_TOKEN_URL, qs: {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    }, json: true }, function(err, response, accessToken) {

      if (response.statusCode !== 200) {
        return res.status(500).json({ status:false, message: accessToken.error.message });
      }

      request.get({ url: process.env.FB_GRF_API+fields, qs: accessToken, json: true }, function(err, response, profile) {

        var username = profile.first_name.toLowerCase()+profile.last_name.toLowerCase();
        var userData = { firstname: profile.first_name, lastname: profile.last_name, username: username, password: generateString(8), social: { facebook: profile.id }, picture: profile.picture.data.url, email: profile.email, gender: profile.gender==='male' ? "M" : "F" };
        var user = new User(userData);

        if (response.statusCode !== 200) {
          return res.status(500).send({ status: false, message: profile.error.message });
        }

        User.findOne( { social: { facebook: profile.id } }, function(err, existingUser) {
          if (existingUser)
            return res.status(200).json({ success: true, message:msg.LOGIN_SUCCESS, token: createJWT(existingUser) });

          user.save(function(err, result) {
            return res.status(200).json({ success: true, message:msg.LOGIN_SUCCESS, token: createJWT(user) });
          });
        });
      });
  });
};


/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
exports.google =  function(req, res) {

  request.post(process.env.GOOGLE_TOKEN_URL, { json: true, form:
    { code: req.body.code,  client_id: req.body.clientId, client_secret: GOOGLE_SECRET, redirect_uri: req.body.redirectUri, grant_type: 'authorization_code' }

  }, function(err, response, token) {

    request.get({ url: process.env.GOOGLE_API_URL, headers: { Authorization: 'Bearer ' + token.access_token }, json: true }, function(err, response, profile) {

      console.log(profile);

      if (profile.error) {
        return res.status(500).json({ status:false, message: profile.error.message});
      }

      User.findOne({ google: profile.sub }, function(err, existingUser) {

        var username = profile.given_name.toLowerCase()+profile.family_name.toLowerCase();
        var userData = { firstname: profile.given_name, lastname: profile.family_name, username: username, password: generateString(8), social: { google: profile.sub }, picture: profile.picture, email: profile.email, gender: profile.gender==='male' ? "M" : "F" };
        var user = new User(userData);

        if (existingUser) {
          return res.status(200).json({ success: true, message: msg.LOGIN_SUCCESS, token: createJWT(existingUser) });
        }

        user.save(function(err, result) { console.error(err, result);
          return res.status(200).json({ success: true, message: msg.LOGIN_SUCCESS, token: createJWT(result) });
        });
      })
    });
  });
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







