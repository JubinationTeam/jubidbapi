//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating custStatus schema
var custStatus={
    primaryId: String,
    status: String,
    loginCount: String,
    isDelete: String,
    createdAt: String,
    updatedAt: String,
    confirmationCode: String,
    offerMailTag: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var custStatusSchema = mongoose.Schema(custStatus);

// exports
module.exports.diet=mongoose.model('custStatus', custStatusSchema);
