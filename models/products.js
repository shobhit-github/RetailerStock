var mongoose          =   require('mongoose')
  , Schema            =   mongoose.Schema;

var mongoosePaginate  =   require('mongoose-paginate')
  , validators        =   require('mongoose-validators')
  , jwt               =   require('jwt-simple');

var moment            =   require('moment');


/**      User Schema
---------------------------------*/
var ProductSchema = new Schema({

  title: { type: String, required: true },
  
  quantity: { type: Number, required:true },
  
  price: { type: Number, required: true },
  
  description: { type:String, required: true },
    
  status : { type: String }
  
  //datetime: { created_at: { type: Date, default: Date.now }, updated_at: { type: Date, default: Date.now } }
  
}, { timestamps: { createdAt : "created_at",  updatedAt : "updated_at" } } );

  
/**      Middlewares
---------------------------------*/
ProductSchema.post('validate', function(doc) {
  
  console.log("ProductSchema validate middleware called", doc);                     // code will here soon...
});



ProductSchema.pre('save', function(next) {
  var product = this;

});



ProductSchema.pre('update', function(next) {

  console.log("ProductSchema update middleware called");   return next();       // code will here soon... 
});











/**      User Models
---------------------------------*/
ProductSchema.statics =  {

  /**
   * Product By ID - fetching the data through the user's id
   */
  findById : function(id, callback) {
    return this.findOne({ _id: id }, callback);
  },



  /**
   * All Products With Specific Fields - fetching all user data with the fields
   */
  findAll : function(fields, callback) {
    if(fields == '*') {
      return this.find({}, callback); 
    }
    return this.find({}, fields, callback);
  },
  
  /**
   * All Products - Paginated form - fetching all user data with the paginated form
   */
  paginateAll : function(options, callback) {
    return this.paginate({}, options, callback);
  },
  
  /**
   * Delete Products - Paginated form - removing multiple user by ids in array
   */
  removeByIds : function(idsArray, callback) {
    return this.remove({ _id: { $in: idsArray } }, callback);
  }
  
};











/**      User Plugins
 ---------------------------------*/

ProductSchema.plugin(mongoosePaginate);


// Now ProductSchema is ready to export for the all modules

module.exports = mongoose.model('Product', ProductSchema);