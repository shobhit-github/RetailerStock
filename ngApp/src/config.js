
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.config(function($httpProvider, $authProvider) {

	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };


    /*
     | Social Authentication Configurations
     |------------------------------------------
    */
    $authProvider.facebook({
        clientId: '1816822548595817',
        url: '/api/facebook'
    });

    $authProvider.google({
        clientId: '272365508948-potcnrtdqvkkcmd5nnjri8v31ubm0gj9.apps.googleusercontent.com',
        url: '/api/google'
    });

    $authProvider.linkedin({
        clientId: '81ectx5uetkc8v',
        url: '/api/linkedin'
    });


});
