
/*     All Dependencies
---------------------------*/
var env  = require('node-env-file')('./.env');
require('./constant');
require('./messages');
require(HELP_ROOT+'utilities');
require(HELP_ROOT+'jade.compiler');



var conf = new Object();

/**
 |==========================================================
 |    Payment Gateways Configurations
 |==========================================================
 */

  var braintree = require('braintree');
  var paypal    = require('paypal-rest-sdk');

 /* Braintree
 ..................*/
conf.BRAINTTREE = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT,
    publicKey:    process.env.BRAINTREE_PUBLIC,
    privateKey:   process.env.BRAINTREE_PRIVATE
});



conf.PAYPAL = paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: process.env.PAYPAL_CLIENTID,
  client_secret: process.env.PAYPAL_SECRET
});













module.exports = conf;