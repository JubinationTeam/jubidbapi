//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating leadStatus schema
var leadStatus={
    primaryId: String,
    wrongEmail: String,
    package: String,
    step2: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var leadStatusSchema = mongoose.Schema(leadStatus);

// exports
module.exports=mongoose.model('leadStatus', leadStatusSchema);
