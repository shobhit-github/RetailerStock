


/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , router  = express.Router()
  , config  = require('./config');

var app  = express()
  , help = require('./helpers');


/*  controller dependencies
..........................................*/
var AuthController    =   require(config.CTRL_DIR+'auth')
  , PaymentController =   require(config.CTRL_DIR+'payment')
  , ChatController    =   require(config.CTRL_DIR+'chat')
  , UserController    =   require(config.CTRL_DIR+'users');





/**
 |=====================================================================
 |    Routers for the retailer stock app...
 |=====================================================================
 */


/* Routes for Authentication Module
 |........................................ */
router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/reset_password', AuthController.resetPassword);
router.get('/logout', AuthController.logout);
router.get('/check_auth', help.ensureAuthenticated, AuthController.checkAuth);


/* Routes for User Module
 |........................................ */
router.put('/update_profile', help.ensureAuthenticated, UserController.updateProfile);
router.delete('/remove_profile/:ids', help.ensureAuthenticated, UserController.deleteUser);
router.put('/modify_password', help.ensureAuthenticated, UserController.changePassword);
router.all('/all_users', help.ensureAuthenticated, UserController.getAllUsers);


/* Routes for Payment Module
 |........................................ */
router.get('/braintree_token', help.ensureAuthenticated, PaymentController.getBrainteeToken);
router.post('/checkout', help.ensureAuthenticated, PaymentController.makePayment);


/* Routes for Chat Module
 |........................................ */
router.get('/chat_list', help.ensureAuthenticated, ChatController.chatList);























module.exports = router;
