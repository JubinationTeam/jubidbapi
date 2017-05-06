//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating transaction schema
var transaction={
    transId: String,
    campaign: String,
    source: String,
    ip: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var transactionSchema = mongoose.Schema(transaction);

// exports
module.exports.transaction=mongoose.model('transaction', transactionSchema);
