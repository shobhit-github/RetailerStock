


/*      Dependencies
 ---------------------------------------------*/

var express = require('express')
  , router  = express.Router();

var app  = express()
  , help = require('./helpers');


/*  controller dependencies
..........................................*/
var UserController    =   require('../controllers/users')
  , AuthController    =   require('../controllers/auth');





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
































module.exports = router;
