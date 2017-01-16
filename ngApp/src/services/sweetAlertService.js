
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.service('$sweetAlert', [ '$timeout', '$window', '$msg',
	function ($timeout, $window, $msg) {
	var swal = $window.swal;
	const time = 400;

    this.confirm = function(title, message, callback) {

        $timeout(function () {
            swal({
                title: title || "Confirmation", text: message, type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Confirm", closeOnCancel: false
            }, function (isConfirm) {
                if(isConfirm) { callback(isConfirm); } else {
                    $timeout(function () { 
                        swal("Cancelled !", $msg.CANCELLED, 'error'); 
                    }, 110);
                }
            }, 'warning');
        }, time);
    };

	this.success = function (title, message) {
        $timeout(function () {
            swal(title, message, 'success');
        }, time);
    };

    this.error = function (title, message) {
        $timeout(function () {
            swal(title || "Oh shit !!" , message, 'error');
        }, time);
    };

    this.warning = function (title, message) {
        $timeout(function () {
            swal(title, message, 'warning');
        }, time);
    };

    this.info = function (title, message) {
        $timeout(function () {
            swal(title, message, 'info');
        }, time);
    }



}]);

