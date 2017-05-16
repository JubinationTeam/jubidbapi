'use strict'
// user-defined dependencies
var index=require('./../../models/schema/index.js');
var firstGuard=require('./../firstGuard.js');

// event names
const callBackEventName='callbackService';
var globalDataAccessCall;

// global event emitter
var global;

// function to define the main service event operation
function init(globalEmitter,globalCall,globalDACall){
    globalEmitter.on(globalCall,operate)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to define pre and post db operation events
function operate(model){
    model.callbackService=callBackEventName;
    model.once('service', preDBOperation);
    model.once(callBackEventName,postDBOperation);
}

//triggering the required db operation based on the request
function preDBOperation(model){
    model.dbOpsType=model.params["ops"];
    model.schema=index[model.req.body.schema];
    model.data=model.req.body.data;
    model.id=model.req.body.id;
    model.pageNo=model.req.body.pageNo
    model=firstGuard(model);
    model.readLimit=100;
    if(model.tag){
        if(model.dbOpsType=="create"||model.dbOpsType=="read"||model.dbOpsType=="delete"||model.dbOpsType=="update"){       
            global.emit(globalDataAccessCall,model)
            model.emit(model.dbOpsType,model)
        }
    }
    else{
        model.emit(model.callBackRouter,model)
    }
}

// function for triggering and setting up the final response in the router
function postDBOperation(model){
    model.info=model.status;
    model.emit(model.callBackRouter,model)
}

// exports
module.exports=init