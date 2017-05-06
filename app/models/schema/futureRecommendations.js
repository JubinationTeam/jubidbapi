//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating futureRecommendations schema
var futureRecommendations={
    primaryId: String,
    comments: String,
    product: String,
    date: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var futureRecommendationsSchema = mongoose.Schema(futureRecommendations);

// exports
module.exports.futureRecommendations=mongoose.model('futureRecommendations', futureRecommendationsSchema);
