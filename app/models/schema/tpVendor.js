//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating tpVendor schema
var tpVendor={
    vendorId: String,
    reportDetails: String,
    vendorContactNumber: String,
    vendorContactMailId: String,
    hardcopy: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var tpVendorSchema = mongoose.Schema(tpVendor);

// exports
module.exports.tpVendor=mongoose.model('tpVendor', tpVendorSchema);
