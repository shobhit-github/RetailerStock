
/*      Dependencies 
---------------------------------------------*/

var Product = require(MODEL_ROOT+'products')
  , Payment = require(CTRL_ROOT+'payment')
  , Notify  = require(HELP_ROOT+'socket') ;

var async   = require('async');

  


 /**
 |======================================================================================
 |    Product Module start here...
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Retrieve all Products Listings
 |--------------------------------------------------
 */
exports.getAllProducts = function(req, res) {
  
  var conditions = new Object()
    , options = JSON.parse(req.query.paging_info);

  options.select = "_id title price quantity description"; // specific fields to be show

  Product.paginate(conditions, options, function(err, result) {

    if(result.total == 0) {
      return res.status(200).json({ success: true, message: msg.NO_RECORD, data: result });
    }

    return res.status(200).json({ success: true, data: result });
  })

};



/*
 |--------------------------------------------------
 | Get One Product Detail
 |--------------------------------------------------
 */
exports.productById = function(req, res) {

  Product.findById(req.query.id, function(err, result) {

    if(!result) {
      return res.status(200).json({ success: true, message: msg.NO_RECORD });
    }

    Notify.customerAdded({ status: true, message: msg.PASSWORD_UPDATED_DONE });
    return res.status(200).json({ success: true, data: result });
  })

};


/*
 |--------------------------------------------------
 | Get One Product Detail
 |--------------------------------------------------
 */
exports.buyProduct = function(req, res) {

  async.waterfall([
      function (callback) {
        Product.findById(req.query.id, function(err, product) {
          if(err) callback(err, null);
          callback(null, product);
        })
      },
      function (request, callback) {
        Payment.createPayment([{ amount:{ total:request.price, currency:'USD' }, description:request.description }], function (err, resp) {
          if(err) callback(err, null);
          callback(null, resp);
        })
      }
  ], function (err, result) {
      if(err) return res.status(400).json({ status: false, message: msg.BAD_REQUEST, err_description: err});
      return res.status(200).json(result);
  })


};