//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

var AccessTypes={
    create:[String],
    read:[String],
    update:[String],
    delete:[String]
}

var AccessTypesSchema = mongoose.Schema(AccessTypes);

var AccessTypes=mongoose.model('AccessTypes', AccessTypesSchema);

// creating user schema
var User={
    name: String,
    access:AccessTypes.schema, 
    maxEntries: Number
    };
var UserSchema = mongoose.Schema(User);

// exports
module.exports=mongoose.model('User', UserSchema);


