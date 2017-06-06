//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating healthCheckup schema
var healthCheckup={
    mobile: String,
    healthCheckupId: { type : String , unique : true, required : true, dropDups: true },
    reportViewed: String,
    reportDownloaded: String,
    vendorId: String,
    reportUrl: String,
    report: [mongoose.Schema.Types.Mixed],
    tags: [mongoose.Schema.Types.Mixed]
    };

var healthCheckupSchema = mongoose.Schema(healthCheckup);

// exports
module.exports=mongoose.model('healthCheckup', healthCheckupSchema);



