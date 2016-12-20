
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , msg     = require(CONF_ROOT+'messages');

var methods = new Object();

var braintree  = require('braintree')
  , gatewayBt  = require(CONF_ROOT+'config').BRAINTTREE;


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

    gatewayBt.clientToken.generate({}, function (err, response) {
        return res.status(200).json({ success: true, _token_braintree: response.clientToken });
    });
};

/*
 |--------------------------------------------------
 | Making Payment through the Braintree
 |--------------------------------------------------
 */
methods.makePayment = function (req, res) {

    var options = {
        amount: "18.00", // this is static amount currently, you need to retrieve amount by using database query
        paymentMethodNonce: req.body.card_info.nonce,
        options: {
            submitForSettlement: true
        }
    };

    gatewayBt.transaction.sale(options, function (err, result) {
        if(err) {
            res.status(200).json({ success: false, message: msg.PAYMENT_FAILED });
        } else if(result.success) {
            res.status(200).json({ success: true, message: msg.PAYMENT_SUCCESS });
        }
    });
};





module.exports = methods;
