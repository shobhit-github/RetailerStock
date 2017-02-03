
/*      Dependencies 
---------------------------------------------*/


var User = require(MODEL_ROOT+'users')
  , Chat = require(MODEL_ROOT+'chats');




 
 
 /**
 |======================================================================================
 |    Socket Module start here...
 |======================================================================================
 */


exports.notification = function (socket) {


  /*
   |--------------------------------------------------
   | Retrieve all Users
   |--------------------------------------------------
   */

  socket.on('add-customer', function(customer) {
    console.log(customer);
    /*io.emit('notification', {
      message: 'new customer',
      customer: customer+" Sharma"
    });*/
  });


};











