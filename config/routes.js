


/*      Dependencies
 ---------------------------------------------*/

var express           = require('express')
  , router            = express.Router();

var mid               = require(HELP_ROOT+'middlewares');


/*  controller dependencies
..........................................*/
var AuthController    =   require(CTRL_ROOT+'auth')
  , PaymentController =   require(CTRL_ROOT+'payment')
  , ChatController    =   require(CTRL_ROOT+'chat')
  , UserController    =   require(CTRL_ROOT+'users');





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
router.get('/check_auth', mid.ensureAuthenticated, AuthController.checkAuth);

router.post('/facebook', AuthController.facebook);
router.post('/google', AuthController.google);
router.post('/linkedn', AuthController.linkedin);


/* Routes for User Module
 |........................................ */
router.put('/update_profile', mid.ensureAuthenticated, UserController.updateProfile);
router.delete('/remove_profile/:ids', mid.ensureAuthenticated, UserController.deleteUser);
router.put('/modify_password', mid.ensureAuthenticated, UserController.changePassword);
router.all('/all_users', mid.ensureAuthenticated, UserController.getAllUsers);


/* Routes for Payment Module
 |........................................ */
router.get('/create_payment', mid.ensureAuthenticated, PaymentController.createPayment);
router.get('/execute_payment', mid.ensureAuthenticated, PaymentController.executePayment);


/* Routes for Chat Module
 |........................................ */
router.get('/chat_list', mid.ensureAuthenticated, ChatController.chatList);























module.exports = router;
