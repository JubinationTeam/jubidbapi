//node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// creating tpProducts schema
var tpProducts={
    vendorId: String,
    product: String,
    price: String,
    margin: String,
    discount: String,
    details: String,
    sku: String,
    tags: [mongoose.Schema.Types.Mixed]
    
    };
var tpProductsSchema = mongoose.Schema(tpProducts);

// exports
module.exports.tpProducts=mongoose.model('tpProducts', tpProductsSchema);
