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

var braintree = require('braintree');
var conf = new Object();

/**
 |==========================================================
 |    Payment Gateways Configurations
 |==========================================================
 */

 /* Braintree
 ..................*/
conf.GATEWAY = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '77b7xzjv7xf3v3nh',
    publicKey:    'gnbyr7qzb2y7sxsw',
    privateKey:   '1a288cba67415b3654a3585b2cdb1873'
});






















module.exports = conf;