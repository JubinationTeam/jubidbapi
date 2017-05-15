//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating diet schema
var diet={
    primaryId: String,
    bmi: String,
    weight: String,
    height: String,
    meal: String,
    lifestyle: String,
    diseases: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var dietSchema = mongoose.Schema(diet);



// exports
module.exports=mongoose.model('diet', dietSchema);
