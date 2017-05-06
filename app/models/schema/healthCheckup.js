//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating healthCheckup schema
var healthCheckup={
    primaryId: String,
    reportViewed: String,
    reportDownloaded: String,
    vendorId: String,
    reportUrl: String,
    positiveProfiles: String,
    positiveTests: String,
    values: String,
    referenceMin: String,
    referenceMax: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var healthCheckupSchema = mongoose.Schema(healthCheckup);

// exports
module.exports.healthCheckup=mongoose.model('healthCheckup', healthCheckupSchema);
