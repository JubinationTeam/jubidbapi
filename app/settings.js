var mongoose=require('mongoose');

var ObjectId = require('mongodb').ObjectID;

module.exports.ObjectId

mongoose.Promise = require('bluebird');

//Depricated
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {   }
const myEmitter = new MyEmitter();
module.exports.emitter=myEmitter
/////////////

module.exports.connect=function(){
    mongoose.connect('mongodb://node123:nodedb123@ds117311.mlab.com:17311/node123db', function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb!');
    }
});
}