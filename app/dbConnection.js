'use strict'
// node dependencies
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');

// mongodb connection
module.exports.connect=function(){
    mongoose.connect('mongodb://node123:nodedb123@ds117311.mlab.com:17311/node123db', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb!');
    }
});
}