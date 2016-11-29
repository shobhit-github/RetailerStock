var mongoose          =   require('mongoose')
  , Schema            =   mongoose.Schema
  , bcrypt            =   require('bcrypt');
  
var msg               =   require('../config/messages')
  , mongoosePaginate  =   require('mongoose-paginate')
  , jwt               =   require('jwt-simple');

var config            =   require('../config/config')
  , moment            =   require('moment');


/**      User Schema
---------------------------------*/
var UserSchema = new Schema({ 

  firstname: { type: String, required: true },
  
  lastname: { type: String, required: true },
  
  username: { type: String, unique: true, required: true },
  
  password: { type:String, required: true },
  
  role:  { type : String, enum:["Administrator","Dealer","Distributor"], default: "Dealer" },
  
  email: { type: String, unique: true, lowercase: true, required: true },
  
  phone: { type: String, unique: true, required: true },
  
  picture: { type: String },
  
  status : { resetpass: { type : String, enum:["YES","NO"], default: "NO" }, profile: { type : String, enum:["YES","NO"], default: "YES" }, deleted: { type : String, enum:["YES","NO"], default: "NO" } }
  
  //datetime: { created_at: { type: Date, default: Date.now }, updated_at: { type: Date, default: Date.now } }
  
}, { timestamps: { createdAt : "created_at",  updatedAt : "updated_at" } } );


/**      Middlewares
---------------------------------*/
UserSchema.post('validate', function(doc) {
  
  console.log("UserSchema validate middleware called");                     // code will here soon... 
});



UserSchema.pre('save', function(next) {
  var user = this;
  if( this.isModified('password') || this.isNew ) {
    
    this.encryptPassword(user.password, function(err, hashed) {
      if(err) { return next(err); }
      user.password = hashed;
      next();
    });
    
  } else {
    return next();
  }
});



UserSchema.pre('update', function(next) {

  console.log("UserSchema update middleware called");   return next();       // code will here soon... 
});











/**      User Models
---------------------------------*/
UserSchema.statics =  {

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
  
}


/**      User Plugins
---------------------------------*/

UserSchema.plugin(mongoosePaginate);





/**      User Methods
---------------------------------*/
UserSchema.methods =  {
  
  
  /**
   * Compare Password - check if the passwords are the same
   */
  comparePassword : function(passw, callback)  {
    bcrypt.compare(passw, this.password, function(err, isMatch) {
      if(err) {
        return callback(err);
      }
       return callback(null, isMatch);
    })
  },
  
  /**
   * Password Encryption - make user password encoded
   */
  encryptPassword : function(str, callback) {

    bcrypt.genSalt(10, function(err, salt) {
      if(err) { return callback(err); }
      
      bcrypt.hash(str, salt, function(err, hash) {
        if(err) { return callback(err); }
        return callback(null, hash);
      })
      
    })
  }
   
}



// Now UserSchema is ready to export for the all modules

module.exports = mongoose.model('User', UserSchema);