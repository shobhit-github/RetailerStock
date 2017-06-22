

/*      Dependencies
 ---------------------------------------------*/

var PubNub          = require('pubnub');
var pubNubChannel   = "Channel-vg2otkim4";



var pNub = new PubNub({
    publishKey: 'pub-c-78a030e7-1460-4af8-a89c-972b1b076826',
    subscribeKey: 'sub-c-c7efcfde-4ade-11e7-ab90-02ee2ddab7fe',
    ssl: true
});


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

    pNub.publish({
        channel:pubNubChannel,
        message:{
            event:'user:login_status:'+status,
            content:{_id:data._id, firstname:data.firstname, lastname:data.lastname, picture:data.picture}
        }
    }, function (status, response) {
        console.log(status, response);
        callback(status, response);
    })

};





