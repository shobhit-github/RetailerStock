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
conf.PAYMENT.braintree = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "useYourMerchantId",
    publicKey: "useYourPublicKey",
    privateKey: "useYourPrivateKey"
});