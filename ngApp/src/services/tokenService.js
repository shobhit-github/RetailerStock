
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.service('$token', ['$cookieStore', '$localStorage', '$sessionStorage', '$window',
	 function ($cookieStore, $localStorage, $sessionStorage, $window) {


	// Manage Token by Cookie
	this.saveInCookie = function(tokenValue) {
    	$cookieStore.put("_token", tokenValue);
	};

	this.deleteFromCookie = function() {
		$cookieStore.remove('_token');
	};

	this.getFromCookie = function() {
		return $cookieStore.get('_token');
	};
	


	// Manage Token by Local Storage
	this.saveInLocal = function(tokenValue) {
    	$localStorage._token = tokenValue;
	};

	this.deleteFromLocal = function() {
		$window.localStorage.clear();
		delete $localStorage._token;
	};

	this.getFromLocal = function() {
		return $localStorage._token
	};


	// Manage Token by Session Storage
	this.saveInSession = function(tokenValue) {
        $sessionStorage._token = tokenValue;
	};

	this.deleteFromSession = function() {
		delete $sessionStorage._token;
	};

	this.getFromSession = function() {
		return $sessionStorage._token;
	};



	// Manage Token from All Storage Media
	this.saveToAllStorage = function(tokenValue) {
    	this.saveInCookie(tokenValue);
    	this.saveInLocal(tokenValue);
    	this.saveInSession(tokenValue);
	};

	this.deleteFromAllStorage = function() {
		
		delete $sessionStorage._token;
		delete $localStorage._token;

		$window.localStorage.clear();
		$cookieStore.remove('_token');
	};


	this.isTokenAvailable = function() {
		if(!this.getFromSession || !this.getFromLocal || !this.getFromCookie) {
			return false;	
		} 
		return true;
	}

}]);

