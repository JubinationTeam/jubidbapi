//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating feedback schema
var feedback={
    primaryId: String,
    satisfactionLevel: String,
    text: String,
    createdAt: String,
    updatedAt: String,
    rating: String,
    type: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var feedbackSchema = mongoose.Schema(feedback);

// exports
module.exports.feedback=mongoose.model('feedback', feedbackSchema);
