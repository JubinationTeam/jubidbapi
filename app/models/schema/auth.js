//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating auth schema
var auth={
    primaryId: String,
    token: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var authSchema = mongoose.Schema(auth);

// exports
module.exports.auth=mongoose.model('auth', authSchema);
