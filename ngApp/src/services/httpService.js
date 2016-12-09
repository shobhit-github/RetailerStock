
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.service('$api', ['$http', '$token', '$q', '$sweetAlert', '$msg', 'SERVER_URL',
  function ($http, $token, $q, $sweetAlert, $msg, SERVER_URL) {

  const SERVER_URI = SERVER_URL+'api/';

  var config = {
    headers: { 'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession() }
  };

  this.loader = function () {
    console.log(this);
  }

  /* Authentication Service
  ----------------------------------------------*/

  this.isAuthorized = function(module_name) { // Check Authorization 
    return $http.get(SERVER_URI+'check_auth', {
      headers: { 'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession() } ,
      params : { 'module_name': module_name }
    });
  };
  
  this.authenticate = function(data) { // Authenticate User
    return $http.post(SERVER_URI+'login', data);
  };

  this.resetPassword = function(email) { // Reset Password
    return $http.post(SERVER_URI+'reset_password', email);
  };
 
  this.exit = function() { // Get Logout
    return $token.deleteFromAllStorage();
  };



  /* User Service
  ----------------------------------------------*/

  this.findMember = function(params) {  // Find user profile
    config.params = params;
    if(params.search) {
      return $http.post(SERVER_URI+'all_users', params.search, config);
    }
    return $http.get(SERVER_URI+'all_users', config);
  };

  this.removeMember = function(data) {

    return $http.delete(SERVER_URI+'remove_profile/'+data, config);
  };

  this.updateUserProfile = function(data) { // Update user profile

    return $http.put(SERVER_URI+'update_profile', data, config);
  };



  /* Shop Service
   ----------------------------------------------*/

  this.getBraintreeToken = function () {

    return $http.get(SERVER_URI+'braintree_token', config);
  };

  this.makePayment = function (data) {

    return $http.post(SERVER_URI+'checkout', data, config);
  };



  /* Chat Service
   ----------------------------------------------*/

  this.getChatList = function (params) {
    config.params = params;
    return $http.get(SERVER_URI+'chat_list', config);
  };

  this.getConversation = function () {

  };







  this.handleError = function(res) {

    switch (res.status) {
      case 400: $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR); break;
      case 403: $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR); break;
      case 500: $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR); break;
      case 503: $sweetAlert.error(res.statusText, $msg.SERVICE_UNAVAILABLE); break;
      case 404: $sweetAlert.error(res.statusText, $msg.NOT_FOUND_ERROR); break;
        
      default:  $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR); break;
    }
  }

}]);

