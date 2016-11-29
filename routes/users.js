
/*      Dependencies 
---------------------------------------------*/

var express = require('express')
  , config = require('../config/config')
  , msg = require('../config/messages')
  , help = require('./helpers'); // helper functions
  
var router = express.Router()
  , User = require('../models/users');

var app = express();

 


 
 
 /**
 |======================================================================================
 |    User Module start here... 
 |======================================================================================
 */


/*
 |--------------------------------------------------
 | Update Existing User Account
 |--------------------------------------------------
 */
router.put('/update_profile', help.ensureAuthenticated, function(req, res) {
    
  User.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: msg.INTERNAL_ERROR });
		}
      return res.status(200).json({
        success: true, 
        message: msg.PROFILE_UPDATED_DONE
      });
  });
});


/*
 |--------------------------------------------------
 | Delete Existing User Account
 |--------------------------------------------------
 */
router.delete('/remove_profile/:ids', help.ensureAuthenticated, function(req, res) {
  
  var ids = req.params.ids.split(',');
  var options;
  
  User.removeByIds(ids, function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
		}
      return res.status(200).json({
        success: true, 
        message: msg.USERS_DELETED
      });
  });
});



/*
 |--------------------------------------------------
 | Modify Password of Existing User Account
 |--------------------------------------------------
 */
router.put('/modify_password', help.ensureAuthenticated, function(req, res) {

  
  req.user.comparePassword(req.body.old_pass, function(err, isMatch) {  // matching password 
    if(!isMatch) {
      return res.status(200).json({ success: false, message: msg.INVALID_PASSWORD });
    }
  });

  
  req.user.encryptPassword(req.body.new_pass, function(err, pass) {   // updating password
    if(err) {
      return res.status(500).json({ success: false, message: msg.INTERNAL_ERROR });
    }
    User.findOneAndUpdate({ password: req.user.password }, { $set: { password: pass } }, function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: msg.INTERNAL_ERROR });
      }

        return res.status(200).json({
          success: true, 
          message: msg.PASSWORD_UPDATED_DONE
        });
    });
  })

});




/*
 |--------------------------------------------------
 | Retrieve all Users account
 |--------------------------------------------------
 */
router.all('/all_users', help.ensureAuthenticated, function(req, res) {
  
  var condition1 = { $or: [ { role: { $ne: "Administrator" } }, { _id: { $ne: req.user._id } } ] },
      condition2 = new Object();
  var options = JSON.parse(req.query.paging_info);

  if(req.method == "POST") {
    var keyword = new RegExp(req.body.keyword, "i");
    
    condition2 = { $or: [ 
      { firstname: keyword }, { lastname: keyword },
      { email: keyword }, { phone: keyword }
    ]};
  }
  
  var conditions = { $and : [ condition1, condition2 ] };
   
  options.select = "_id firstname lastname phone role created_at"; // specific fields to be show
  
  User.paginate(conditions, options, function(err, result) {
    
    if(result.total == 0) {
      return res.status(200).json({ success: true, message: msg.NO_RECORD, data: result });
    }
    
    return res.status(200).json({ success: true, data: result });
  })

});




module.exports = router;
