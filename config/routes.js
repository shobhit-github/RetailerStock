


/*      Dependencies
 ---------------------------------------------*/

var express           = require('express')
  , router            = express.Router();

var mid               = require(CTRL_ROOT+'middlewares');


/*  controller dependencies
..........................................*/
var AuthController              =   require(CTRL_ROOT+'auth')
  , PaymentController           =   require(CTRL_ROOT+'payment')
  , ChatController              =   require(CTRL_ROOT+'chat')
  , UserController              =   require(CTRL_ROOT+'users')
  , ProductController           =   require(CTRL_ROOT+'products');





/**
 |=====================================================================
 |    Routers for the retailer stock app...
 |=====================================================================
 */


/* Routes for Authentication Module
 |........................................ */
router.post('/signup', mid.languageSetter, AuthController.signUp);
router.post('/login', mid.languageSetter, AuthController.login);
router.post('/reset_password', mid.languageSetter, AuthController.resetPassword);
router.get('/logout', AuthController.logout);
router.get('/check_auth', [ mid.languageSetter, mid.ensureAuthenticated ], AuthController.checkAuth);

router.post('/facebook', mid.languageSetter, AuthController.facebook);
router.post('/google', mid.languageSetter, AuthController.google);
router.post('/linkedin', mid.languageSetter, AuthController.linkedin);


/* Routes for User Module
 |........................................ */
router.put('/update_profile', [ mid.languageSetter, mid.ensureAuthenticated ], UserController.updateProfile);
router.delete('/remove_profile/:ids', [ mid.languageSetter, mid.ensureAuthenticated ], UserController.deleteUser);
router.put('/modify_password', [ mid.languageSetter, mid.ensureAuthenticated ], UserController.changePassword);
router.all('/all_users', [ mid.languageSetter, mid.ensureAuthenticated ], UserController.getAllUsers);


/* Routes for Payment Module
 |........................................ */
router.get('/create_payment', [ mid.languageSetter, mid.ensureAuthenticated ], PaymentController.createPayment);
router.get('/execute_payment', [ mid.languageSetter, mid.ensureAuthenticated ], PaymentController.executePayment);
router.get('/transations_list', [ mid.languageSetter, mid.ensureAuthenticated ], PaymentController.getTransactions);
router.post('/paypal_notify', mid.languageSetter, PaymentController.paypalNotifications);


/* Routes for Chat Module
 |........................................ */


/* Routes for Product Module
 |........................................ */
router.get('/product_list', [ mid.languageSetter, mid.ensureAuthenticated ], ProductController.getAllProducts);
router.get('/product_detail', [ mid.languageSetter, mid.ensureAuthenticated ], ProductController.productById);
router.get('/buy_product', [ mid.languageSetter, mid.ensureAuthenticated ], ProductController.buyProduct);























module.exports = router;
