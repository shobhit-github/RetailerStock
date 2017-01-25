
/*      Dependencies 
---------------------------------------------*/

var Product = require(MODEL_ROOT+'products');

  


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
    return res.status(200).json({ success: true, data: result });
  })

};
