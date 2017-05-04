'use strict'


//services
var serviceAuthorizeOps=require('./app/services/authorizationProcessor/authorization.js');
var serviceAuthenticate=require('./app/services/requestProcessor/authenticate.js');

//data access
var userDataAccess=require('./app/dataAccess/userDataAccess.js');

//global event emitter
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {   }
const myEmitter = new MyEmitter();

//instantiating Service layer and Data Access layer
function init(){
    serviceAuthorizeOps(myEmitter);
    serviceAuthenticate(myEmitter);
    userDataAccess(myEmitter);
}

//exports
module.exports.globalEmitter=myEmitter;
module.exports.init=init;