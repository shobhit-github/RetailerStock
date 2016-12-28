
/*     All Dependencies
---------------------------*/
var env  = require('node-env-file')('./.env');
require('./constant');
require(HELP_ROOT+'utilities');
require(HELP_ROOT+'jade.compiler');



var conf = new Object();

/**
 |==========================================================
 |    Payment Gateways Configurations
 |==========================================================
 */

  var braintree = require('braintree');

 /* Braintree
 ..................*/
conf.BRAINTTREE = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT,
    publicKey:    process.env.BRAINTREE_PUBLIC,
    privateKey:   process.env.BRAINTREE_PRIVATE
});
















module.exports = conf;