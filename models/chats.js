var mongoose          =   require('mongoose')
  , Schema            =   mongoose.Schema;

var mongoosePaginate  =   require('mongoose-paginate');

var moment            =   require('moment');


/**      User Schema
---------------------------------*/
var ChatSchema = new Schema({

  sender_id: { type: String, required: true },
  
  receiver_id: { type: String, required: true },
  
  message: { type: String, required: true }

  //status : { type : String, enum:["U","NO"], default: "NO" }, profile: { type : String, enum:["YES","NO"], default: "YES" }, deleted: { type : String, enum:["YES","NO"], default: "NO" } }
  
  //datetime: { created_at: { type: Date, default: Date.now }, updated_at: { type: Date, default: Date.now } }
  
}, { timestamps: { createdAt : "created_at",  updatedAt : "updated_at" } } );







/**      User Models
---------------------------------*/
ChatSchema.statics =  {

  /**
   * User By ID - fetching the data through the user's id
   */
  findById : function(id, callback) {
    return this.findOne({ _id: id }, callback);
  },
  
  /**
   * All Users With Specific Fields - fetching all user data with the fields
   */
  findAll : function(fields, callback) {
    if(fields == '*') {
      return this.find({}, callback); 
    }
    return this.find({}, fields, callback);
  },
  
  /**
   * All Users - Paginated form - fetching all user data with the paginated form
   */
  paginateAll : function(options, callback) {
    return this.paginate({}, options, callback);
  },
  
  /**
   * Delete Users - Paginated form - removinf multiple user by ids in array
   */
  removeByIds : function(idsArray, callback) {
    return this.remove({ _id: { $in: idsArray } }, callback);
  }
  
};


/**      User Plugins
---------------------------------*/

ChatSchema.plugin(mongoosePaginate);







// Now UserSchema is ready to export for the all modules

module.exports = mongoose.model('Chat', ChatSchema);