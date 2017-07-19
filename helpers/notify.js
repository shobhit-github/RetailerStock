/*      Dependencies
 ---------------------------------------------*/

var PubNub = require(CONF_ROOT + 'config').PUBNUB;


/**
 |======================================================================================
 |    Notification Module start here...
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Notify that user is login now..
 |--------------------------------------------------
 */
exports.userLogin = function (data, status, callback) {

    PubNub.publish({
        channel: 'user:login_status:' + status,
        message: {_id: data._id, firstname: data.firstname, lastname: data.lastname, picture: data.picture}
    }, function (status, response) {

        callback(status, response);
    })

};

/*
 |--------------------------------------------------
 | Notify that new user added..
 |--------------------------------------------------
 */
exports.newUserRegistered = function (data, callback) {

    PubNub.publish({
        channel: 'user:registration',
        message: {_id: data._id, firstname: data.firstname, lastname: data.lastname}
    }, function (status, response) {

        callback(status, response);
    })

};


