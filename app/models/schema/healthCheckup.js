//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating positiveTests schema
var positiveTests={
    positiveTests: String,
    values: String,
    referenceMin: String,
    referenceMax: String,
    tags: [mongoose.Schema.Types.Mixed]
    };
var positiveTestsSchema = mongoose.Schema(positiveTests);

// exports
var positiveTestsVar=mongoose.model('PositiveTests', positiveTestsSchema);


// creating positiveProfile schema
var positiveProfiles={
    profileName: String,
    testDetails: [positiveTestsVar.schema],
    tags: [mongoose.Schema.Types.Mixed]
};
var positiveProfilesSchema = mongoose.Schema(positiveProfiles);

// exports
var positiveProfilesVar=mongoose.model('PositiveProfiles', positiveProfilesSchema);

// creating healthCheckup schema
var healthCheckup={
    primaryId: String,
    healthCheckupId: String,
    reportViewed: String,
    reportDownloaded: String,
    vendorId: String,
    reportUrl: String,
    positiveProfiles: [positiveProfilesVar.schema],
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var healthCheckupSchema = mongoose.Schema(healthCheckup);

// exports
module.exports=mongoose.model('healthCheckup', healthCheckupSchema);



