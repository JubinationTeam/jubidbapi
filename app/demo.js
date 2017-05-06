'use strict'

const EventEmitter = require('events');
class Model extends EventEmitter {   }

//Creating new model
var model=new Model()

//user-defined dependencies
var creator=require('./controller/helper.js').httpBlockGetter;
var globalEmitter=require('./init.js').globalEmitter;
var opHandler=require('./controller/operationHandler.js').globalEmitter;
//var process= require('./controller/operationHandler.js')

var globalCall=null;

function process(app){
        app.post('/:main/:ops', setup);
        return app;
}

function setup(req,res){
    
        if(req.params.main=='user'){
                globalCall='authServiceCall';
  
        }
        else if(req.params.main=='do'){
                globalCall='reqServiceCall';  
        }
    console.log(globalCall);
    model.req=req;
    model.res=res;
    model.globalCall=globalCall;
    globalEmitter.emit("call",model);
}

module.exports.process=process;
module.exports.globalCall=globalCall
