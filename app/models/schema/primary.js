//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating primary schema
var primary={
    primaryId: String,
    name: String,
    mobile: String,
    email: String,
    address: String,
    password: String,
    dob: String,
    gender: String,
    age: String,
    city: String,
    pincode: String,
    stage: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var primarySchema = mongoose.Schema(primary);

// exports
module.exports.primary=mongoose.model('primary', primarySchema);
