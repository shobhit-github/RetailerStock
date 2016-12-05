/**
 * [...]
 * In addition, this file provides many configurations for
 * different kind third-party api manage their {@client-key}
 * {@private-kay} or any kinds of {@conf-key}, that help to
 * manage constants and methods to useful when dealing with a
 * {@main-app}.
 *
 * @author  Shobhit Sharma
 * @version >6.0, 02-Dec-2016
 * @tech    NodeJS (JavaScript)
 */


/*      Dependencies
 ---------------------------------------------*/
var env  = require('node-env-file')('./.env');

var braintree = require('braintree')
  , Razorpay = require('razorpay');

var conf = new Object();

/**
 |==========================================================
 |    Payment Gateways Configurations
 |==========================================================
 */
console.log(process.env);
 /* Braintree
 ..................*/
conf.BRAINTTREE = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT,
    publicKey:    process.env.BRAINTREE_PUBLIC,
    privateKey:   process.env.BRAINTREE_PRIVATE
});

 /* Razorpay
 ..................*/
conf.RAZORPAY = new Razorpay({
    key_id:      process.env.RAZORPAY_KEYID,
    key_secret:  process.env.RAZORPAY_KEYSECRET
});



















module.exports = conf;