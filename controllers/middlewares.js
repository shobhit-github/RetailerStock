
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , lng = require(LNG_ROOT+'setting');
  
var crypto = require('crypto')
  , algorithm = 'aes-256-ctr'
  , cryptoKey = TOKEN_SECRET;
  
var nodeMailer  = require('nodemailer')
  , transporter = nodeMailer.createTransport('smtps://'+SMTP_USER+':'+SMTP_PASS+'@'+SMTP_HOST+'');

var jwt = require('jwt-simple')
  , moment = require('moment');

var middleware = new Object();



/**
 |======================================================================================
 |    Middleware Module start here...
 |======================================================================================
 */



/*
 |--------------------------------------------------
 | Ensure Authentication (Middleware 1)
 |--------------------------------------------------
 */
middleware.ensureAuthenticated = function (req, res, next) {

  if (!req.header('Authorization')) {
    return res.status(401).json({ success: false, message: txt.TOKEN_MISMATCH });
  }

  let token = req.header('Authorization').split(' ')[1];
  let payload = null;

  try {
    payload = jwt.decode(token, TOKEN_SECRET); 
  }
  catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ success: false, message: txt.TOKEN_EXPIRE });
  }

  req.user = payload.sub;
  next();

};


/*
 |--------------------------------------------------
 | Language Checker (Middleware 2)
 |--------------------------------------------------
 */
middleware.languageSetter = function (req, res, next) {

    var placeholders
      , lang = req.header('Language');

    if( !req.header('Language') ) {
        placeholders = 'en';
    }
    else {
        placeholders = lang;
    }


    var placeholders = lng(placeholders);

    global.txt = placeholders;
    next();

};















module.exports = middleware;




