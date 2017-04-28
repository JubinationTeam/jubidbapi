 var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

var User={
    name: String,
    access:[String], 
    maxEntries: Number
    };
var UserSchema = mongoose.Schema(User);
module.exports.User=mongoose.model('User', UserSchema);
