//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating leadFollowUpStatus schema
var leadFollowUpStatus={
    status: String,
    comment: String,
    lastUpdated: String,
    followUpdate: String,
    admin: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var leadFollowUpStatusSchema = mongoose.Schema(leadFollowUpStatus);

// exports
module.exports.leadFollowUpStatus=mongoose.model('leadFollowUpStatus', leadFollowUpStatusSchema);
