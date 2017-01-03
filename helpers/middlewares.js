
/*      Dependencies 
---------------------------------------------*/

var express = require('express')

var msg = require(CONF_ROOT+'messages');
  
var crypto = require('crypto')
  , algorithm = 'aes-256-ctr'
  , cryptoKey = TOKEN_SECRET;
  
var nodeMailer  = require('nodemailer')
  , transporter = nodeMailer.createTransport('smtps://'+SMTP_USER+':'+SMTP_PASS+'@'+SMTP_HOST+'');

var jwt = require('jwt-simple')
  , moment = require('moment');

var helper = new Object();
  


/**
 |======================================================================================
 |    Helper Methods for Authentication module
 |======================================================================================
 */
  
/*
 |--------------------------------------------------
 | Ensure Authentication (Middleware 1)
 |--------------------------------------------------
 */
helper.ensureAuthenticated = function (req, res, next) {

  if (!req.header('Authorization')) {
    return res.status(401).json({
      success: false,
      message: msg.TOKEN_MISMATCH
    });
  }
  var token = req.header('Authorization').split(' ')[1];
  var payload = null;

  try {
    payload = jwt.decode(token, TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ success: false, message: msg.TOKEN_EXPIRE });
  }

  req.user = payload.sub;
  next();

};

















module.exports = helper;
