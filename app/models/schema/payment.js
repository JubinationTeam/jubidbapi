//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating payment schema
var payment={
    primaryId: String,
    mode: String,
    type: String,
    cardNo: String,
    transId: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var paymentSchema = mongoose.Schema(payment);

// exports
module.exports.payment=mongoose.model('payment', paymentSchema);
