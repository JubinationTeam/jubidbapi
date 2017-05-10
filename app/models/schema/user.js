//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating user schema
var User={
    name: String,
    access:[String], 
    maxEntries: Number
    };
var UserSchema = mongoose.Schema(User);

// exports
module.exports=mongoose.model('User', UserSchema);
