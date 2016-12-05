
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , config  = require('../config/config')
  , msg     = require('../config/messages');

var app   = express()
  , help  = require('../config/helpers');

var methods = new Object();


var braintree = require('braintree')
  , gateway = require('../lib/config').BRAINTTREE;



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


/*
 |--------------------------------------------------
 | Making Payment through the Braintree
 |--------------------------------------------------
 */
methods.makePayment = function (req, res) {

    var saleOptions = {
        amount: "18.00", // this is static amount currently, you need to retrieve amount by using database query
        paymentMethodNonce: req.body.card_info.nonce,
        options: {
            submitForSettlement: true
        }
    };

    gateway.transaction.sale(saleOptions, function (err, result) {
        if(err) {
            res.status(200).json({ success: false, message: msg.PAYMENT_FAILED });
        } else if(result.success) {
            res.status(200).json({ success: true, message: msg.PAYMENT_SUCCESS });
        }
    });
};






module.exports = methods;
