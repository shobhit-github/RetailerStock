
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require('../config/messages');

var app   = express()
  , help  = require('../config/helpers');

var methods = new Object();


var braintree = require('braintree');



/**
 |======================================================================================
 |    Payment Module start here...
 |======================================================================================
 */




/*
 |--------------------------------------------------
 | Retrieving Braintree Client Token
 |--------------------------------------------------
 */
methods.getBrainteeToken = function(req, res) {

    gateway.clientToken.generate({}, function (err, response) {
        res.status.json({success: true, _token_braintree: response.clientToken});
    });
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
