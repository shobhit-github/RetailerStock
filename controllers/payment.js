
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require('../config/messages');

var app   = express()
  , help  = require('../config/helpers');

var methods = new Object();


var braintree = require('braintree')
  , gateway = require('../lib/config').PAYMENT;



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

    gateway.braintree.clientToken.generate({}, function (err, response) {
        console.log(response);
        res.status.json({success: true, _token_braintree: response.clientToken});
    });
};










module.exports = methods;
