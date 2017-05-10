//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating scheduledMails schema
var scheduledMails={
    title: String,
    content: String,
    mailingList: String,
    status: String,
    owner: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var scheduledMailsSchema = mongoose.Schema(scheduledMails);

// exports
module.exports=mongoose.model('scheduledMails', scheduledMailsSchema);
