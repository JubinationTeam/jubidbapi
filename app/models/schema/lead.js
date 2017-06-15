//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating primary schema
var lead={
    leadId: { type : String , unique : true, required : true, dropDups: true },
    name: String,
    mobile: String,
    email: String,
    address: String,
    dob: String,
    gender: String,
    age: String,
    city: String,
    pincode: String,
    product: String,
    tpVendor:String,
    amount: String,
    modeOfPayment: String,
    ipAddress: String,
    tags: [mongoose.Schema.Types.Mixed]
    };

var leadSchema = mongoose.Schema(lead);

// exports
module.exports=mongoose.model('lead', leadSchema);
