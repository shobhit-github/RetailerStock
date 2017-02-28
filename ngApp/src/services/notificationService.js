
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.service('$notify', [ '$timeout', '$window', '$msg',
	function ($timeout, $window, $msg) {


    const styling = 'bootstrap3';

    this.default = function(title, message) {

        new PNotify({ title: title || "Notification", text: message, type: 'info', styling: styling, addclass: 'dark' });
    };

	this.success = function (title, message) {

        new PNotify({ title: title || "Success", text: message, type: 'success', styling: styling });
    };

    this.error = function (title, message) {

        new PNotify({ title: title || "Oh Shit !!", text: message, type: 'error', styling: styling });
    };

    this.warning = function (title, message) {

        new PNotify({ title: title || "Warning !", text: message, styling: styling });
    };

    this.info = function (title, message) {

        new PNotify({ title: title || "Information", text: message, type: 'info', styling: styling });
    }


}]);

