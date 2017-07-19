
/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , async   = require('async')
  , paypal  = require('paypal-rest-sdk');



const returnUrl = SERVER_URI+'#/processPayment';
const cancelUrl = SERVER_URI+'#/cancelPayment';

/**
 |======================================================================================
 |    Payment Module start here...
 |======================================================================================
 */

 var payReq = { intent:'sale', redirect_urls:{ return_url:returnUrl, cancel_url: cancelUrl  }, payer:{ payment_method:'paypal' } };

/*
 |--------------------------------------------------
 | Create Payment through the PayPal
 |--------------------------------------------------
 */
exports.createPayment = function(transationDetail, callback) {

    var links = new Object();
    payReq.transactions = transationDetail;

    paypal.payment.create(JSON.stringify(payReq), function(err, payment) {

        if(err)
            return callback({ status: false, message: txt.PAYMENT_FAILED }, false);

            payment.links.forEach(function(linkObj){
                links[linkObj.rel] = {
                    href: linkObj.href,
                    method: linkObj.method
                };
            });

        if (links.hasOwnProperty('approval_url')) {
            callback(false, { status:true, pay_url:links['approval_url'].href });
        } else {
            callback({ status: false, message: txt.BAD_REQUEST }, false);
        }

    });
};

/*
 |--------------------------------------------------
 | Making Payment through the PayPal
 |--------------------------------------------------
 */
exports.executePayment = function (req, res) {

   paypal.payment.execute(req.query.paymentId, { payer_id: req.query.payerId }, function(error, payment) {

        if(error) return res.status(400).json({
           status:false, message: txt.PAYMENT_FAILED
        });

        if (payment.state == 'approved')
            return res.status(200).json({ status:true, message: txt.PAYMENT_SUCCESS });

        return res.status(400).json({ status:true, message: txt.PAYMENT_FAILED});
    });
};



/*
 |--------------------------------------------------
 | Get PayPal Transactions List
 |--------------------------------------------------
 */
exports.getTransactions = function (req, res) {

    paypal.payment.list({ start_index: 0 }, function (error, transactions) {
        if (error)
            return res.status(400).json({ status: false, message: txt.BAD_REQUEST});

        return res.status(200).json( { status: true, count:transactions.payments.length, response: transactions.payments } );
    });
};


/*
 |--------------------------------------------------
 | Get all paypal webhooks notification events
 |--------------------------------------------------
 */
exports.paypalNotifications = function (req, res) {

    // var headers     = { 'paypal-auth-algo': req.headers.paypal-auth-algo, 'paypal-cert-url': req.headers.paypal-cert-url, 'paypal-transmission-id': req.headers.paypal-transmission-id, 'paypal-transmission-sig': req.headers.paypal-transmission-sig, 'paypal-transmission-time': req.headers.paypal-transmission-time };

    paypal.notification.webhookEvent.verify(req.headers, req.body, '73B67500R3338843F', function (error, response) {
        if (error) 
            return res.status(400).json({ status: false, message: txt.BAD_REQUEST});

        console.log("WEBHOOK ->", response);
        // if (response.verification_status === 'SUCCESS')
        //     return res.status(400).json({ status: false, message: txt.PAYMENT_VERIFIED});
        //
        // return res.status(200).json({ status: false, message: txt.PAYMENT_NOT_VERIFIED});
    });
};




