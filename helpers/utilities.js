
/*      Dependencies 
---------------------------------------------*/

var express = require('express');

var crypto = require('crypto')
  , algorithm = 'aes-256-ctr'
  , cryptoKey = TOKEN_SECRET;
  
var nodeMailer  = require('nodemailer')
  , transporter = nodeMailer.createTransport('smtps://'+SMTP_USER+':'+SMTP_PASS+'@'+SMTP_HOST+'');

var jwt = require('jwt-simple')
  , moment = require('moment');


  


/**
 |======================================================================================
 |    Helper Methods that will user globally in this app
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------
 */

global.createJWT = function (user) {

  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, TOKEN_SECRET);
};




/*
 |--------------------------------------------------
 | Encryption && Decryption Algorithm
 |--------------------------------------------------
 */

global.encrypt = function(str) {   // Encryption

  var cipher = crypto.createCipher(algorithm, cryptoKey);
  var crypted = cipher.update(str,'utf8','hex');
  
  crypted += cipher.final('hex');
  
  return crypted;
};

global.decrypt = function(str) {   // Decryption
  
  var decipher = crypto.createDecipher(algorithm, cryptoKey);
  var dec = decipher.update(str,'hex','utf8');
  
  dec += decipher.final('utf8');
  
  return dec;
};




/*
 |--------------------------------------------------
 | Node Mailer 
 |--------------------------------------------------
 */

global.sendMail = function(mailOption, callback) {

  // send mail with defined transport object
  transporter.sendMail(mailOption, function(error, info){
    if(error){
      callback(info);
    }
    callback(info);
  });

};
 























