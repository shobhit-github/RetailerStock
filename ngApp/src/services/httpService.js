"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.service('$api', ['$http', '$token', '$rootScope', '$sweetAlert', '$msg', 'SERVER_URL',
    function ($http, $token, $rootScope, $sweetAlert, $msg, SERVER_URL) {

        const SERVER_URI = SERVER_URL + 'api/';

        var config = {
            headers: {'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession()}
        };


        /* Authentication Service
         ----------------------------------------------*/

        this.isAuthorized = function (module_name) {
            return $http.get(SERVER_URI + 'check_auth', {
                headers: {'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession()},
                params: {'module_name': module_name}
            });
        };

        this.authenticate = function (data) {
            return $http.post(SERVER_URI + 'login', data);
        };

        this.resetPassword = function (email) {
            return $http.post(SERVER_URI + 'reset_password', email);
        };

        this.exit = function () {
            $token.deleteFromAllStorage();
            return $http.get(SERVER_URI + 'logout',  {params: {user: $rootScope.user} })
        };


        /* User Service
         ----------------------------------------------*/

        this.findMember = function (params) {
            config.params = params;
            if (params.search) {
                return $http.post(SERVER_URI + 'all_users', params.search, config);
            }
            return $http.get(SERVER_URI + 'all_users', config);
        };

        this.removeMember = function (data) {

            return $http.delete(SERVER_URI + 'remove_profile/' + data, config);
        };

        this.updateUserProfile = function (data) {

            return $http.put(SERVER_URI + 'update_profile', data, config);
        };

        this.usersCount = function () {

            return $http.get(SERVER_URI + 'users_count', config);
        };



        /* Shop Service
         ----------------------------------------------*/

        this.makePayment = function (params) {
            config.params = params;
            return $http.get(SERVER_URI + 'execute_payment', config);
        };



        /* Chat Service
         ----------------------------------------------*/

        this.getChatList = function (params) {

            return $http.get(SERVER_URI+'chat_list', config);
        };

        this.saveMessage = function(data) {

            return $http.post(SERVER_URI + 'save_message', data, config);
        };

        this.getConversation = function () {

        };





        /* Product Service
         ----------------------------------------------*/

        this.products = function (params) {
            config.params = params;
            if (params.search) {
                return $http.post(SERVER_URI + 'product_list', params.search, config);
            }
            return $http.get(SERVER_URI + 'product_list', config);
        };

        this.productDetail = function (id) {
            config.params = {id: id};
            return $http.get(SERVER_URI + 'product_detail', config);
        };

        this.buyProduct = function (params) {
            config.params = params;
            return $http.get(SERVER_URI + 'buy_product', config);
        };



























        this.handleError = function (res) {

            switch (res.status) {
                case 400:
                    $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR);
                    break;
                case 403:
                    $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR);
                    break;
                case 500:
                    $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR);
                    break;
                case 503:
                    $sweetAlert.error(res.statusText, $msg.SERVICE_UNAVAILABLE);
                    break;
                case 404:
                    $sweetAlert.error(res.statusText, $msg.NOT_FOUND_ERROR);
                    break;

                default:
                    $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR);
                    break;
            }
        };


    }]);

