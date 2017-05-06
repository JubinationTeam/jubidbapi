'use strict'


//services
var serviceAuthorizeOps=require('./services/profileManager/userProfileService.js');
var serviceAuthenticate=require('./services/operations/authenticateService.js');

var demo=require('./controller/operationHandler.js').demo;

//data access
var userDataAccess=require('./dataAccess/userDataAccess.js');

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


//Creating new model
var model=new MyEmitter ()

//user-defined dependencies
//var creator=require('./controller/helper.js').httpBlockGetter;
//var globalEmitter=require('./init.js').globalEmitter;
//var opHandler=require('./controller/operationHandler.js').globalEmitter;
//var process= require('./controller/operationHandler.js')

function process(app){
        app.post('/:user/:ops', setup);
        return app;
}

function setup(req,res){
    model.req=req;
    model.res=res;
    model.firstParam=req.params.user;
    model.secondParam=req.params.ops;
    model.globalCall=model.firstParam.concat(model.secondParam);
    model.globalEmitter=myEmitter;
    demo(myEmitter);
    myEmitter.emit("callOpHandler",model);
}

module.exports.process=process;

//exports
module.exports.globalEmitter=myEmitter;
module.exports.init=init;