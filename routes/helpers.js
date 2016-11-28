
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , config = require('../config/config')
  
var User   = require('../models/users')
  , msg = require('../config/messages');
  
var crypto = require('crypto')
  , algorithm = 'aes-256-ctr'
  , cryptoKey = config.TOKEN_SECRET;
  
var nodeMailer  = require('nodemailer')
  , transporter = nodeMailer.createTransport('smtps://'+config.SMTP_USER+':'+config.SMTP_PASS+'@'+config.SMTP_HOST+'');

var jwt = require('jwt-simple')
  , moment = require('moment')
  , app = express();

var helper = new Object();
  

  
/**
 |======================================================================================
 |    Helper Methods that will user globally in this app
 |======================================================================================
 */
  
/*
 |--------------------------------------------------
 | Ensure Authentication 
 |--------------------------------------------------
 */
helper.ensureAuthenticated = function (req, res, next) {

  if (!req.header('Authorization')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Please make sure your request has an Authorization header'
    });
  }
  var token = req.header('Authorization').split(' ')[1];
  var payload = null;
  
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ success: false, message: msg.TOKEN_EXPIRE });
  }
  
  req.user = payload.sub;
  next();
  
}

/*
 |--------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------
 */

helper.createJWT = function (user) {
    
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}




/*
 |--------------------------------------------------
 | Encryption && Decryption Algorithm
 |--------------------------------------------------
 */

helper.encrypt = function(str) {   // Encryption 

  var cipher = crypto.createCipher(algorithm, cryptoKey);
  var crypted = cipher.update(str,'utf8','hex');
  
  crypted += cipher.final('hex');
  
  return crypted;
}
 
 
helper.decrypt = function(str) {   // Decryption 
  
  var decipher = crypto.createDecipher(algorithm, cryptoKey);
  var dec = decipher.update(str,'hex','utf8');
  
  dec += decipher.final('utf8');
  
  return dec;
}




/*
 |--------------------------------------------------
 | Node Mailer 
 |--------------------------------------------------
 */

helper.sendEmail = function(mailOption, callback) {

  // send mail with defined transport object 
  transporter.sendMail({
    'from'    : mailOption.from,
    'to'      : mailOption.to,
    'subject' : mailOption.subject,
    'html'    : mailOption.html
    
  }, function(error, info){
      if(error){
        callback(false);
      }
      callback(true);
  });
  

}
 























module.exports = helper;
