
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require('../config/messages');

var app   = express()
  , help  = require('../config/helpers');

var methods = new Object();


var braintree = require('braintree')
  , gateway = require('../lib/config').GATEWAY;



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
        console.log(response);
        return res.status(200).json({ success: true, _token_braintree: response.clientToken });
    });
};



methods.makePayment = function (req, res) {


    console.log(req.body);

    /*var saleOptions = {
        amount: "25.00", // this is static amount currently, you need to retrieve amount by using database query
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    };

    gateway.transaction.sale(saleOptions, function (err, result) {
    });*/
};






module.exports = methods;
