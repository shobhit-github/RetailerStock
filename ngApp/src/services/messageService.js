
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.service('$msg', [
	function () {

	return {
		// Error Messages
		'INTERNAL_SERVER_ERROR'	:	"There was an internal server error, please contact to the website / software administrator !",
		'SERVICE_UNAVAILABLE'	:	"Currently this service is under maintenance, please try after some time !",
		'NOT_FOUND_ERROR'		: 	"There was an error due to requested url not found, please contact to the website / software administrator !",
		'AUTHENTICATION_ERROR'	: 	"There was an error due to unauthorized access from the client end, please contact to the software administrator !",
		'SESSION_EXPIRE'		: 	"Session has been expired !",

		// Information Massages
		'LOGIN_REQUIRE'			: 	"You've to login to start session again!",
		'ALREADY_LOGIN'			: 	"You're already in session !",

		// Success Messages
		'LOGOUT_SUCCESS'		: 	"Logout successfully",

		// Confirmation Messages
		"CONFIRM_DELETE"		: 	"Please make sure once you deleted it you will not be able to recover this imaginary content!",

		// Common Messages
		"CANCELLED"				: 	"This operation has been cancelled, please try it again if this happened without your concent!",
	};


}]);

