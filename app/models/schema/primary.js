//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating primary schema
var primary={
    name: String,
    mobile: { type : String , unique : true, required : true, dropDups: true },
    email: { type : String , unique : true, required : true, dropDups: true },
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
module.exports=mongoose.model('primary', primarySchema);
