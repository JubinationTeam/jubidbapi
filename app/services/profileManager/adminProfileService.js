'use strict'
// user-defined dependencies
var index=require('./../../models/schema/index.js');

// event names
const callBackEventName='callbackService';
var globalDataAccessCall;

// global event emitter
var global;

// function to define the main service event operation
function ServicePlan(globalEmitter,globalCall,globalDACall){
    console.log("global "+globalCall+" on")
    globalEmitter.on(globalCall,operate)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to define pre and post db operation events
function operate(model){
    model.callbackService=callBackEventName;
    console.log("model service once")
    model.once('service', preDBOperation);
    console.log("model "+callBackEventName+" once")
    model.once(callBackEventName,postDBOperation);
}

//triggering the required db operation based on the request
function preDBOperation(model){
    model.dbOpsType=model.params["ops"];
    model.schema=index[model.req.body.schema];
    model.data=model.req.body.data;
    model.id=model.req.body.id;
    var nextCall;
    
    if(model.schema==null||!model.schema)
    {
        model.info='Invalid schema'
        nextCall=model.callBackRouter
    }
    // validating the type of request 
    else if(model.dbOpsType=="create"||model.dbOpsType=="read"||model.dbOpsType=="delete"||model.dbOpsType=="update")
    {       
        //setting up the data access layer
        console.log("global "+globalDataAccessCall+" emit")
        global.emit(globalDataAccessCall,model)
        nextCall=model.dbOpsType
    }
    else
    {
        //  reply for out of scope request
        model.info='URL Not Valid, Use create/read/delete/update'
        nextCall=model.callBackRouter
    }
    
        console.log("model "+nextCall+" emit")
        model.emit(nextCall,model)
}

// function for triggering and setting up the final response in the router
function postDBOperation(model){
    model.info=model.status;
    console.log("model "+model.callBackRouter+" emit")
    model.emit(model.callBackRouter,model)
}

// exports
module.exports=ServicePlan