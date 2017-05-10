'use strict'
// user-defined dependencies
var index=require('./../../models/schema/index.js');

// event names
const callBackEventName='sendBackService';
var globalDataAccessCall;

// global event emitter
var global;

// function to define the main service event operation
function ServicePlan(globalEmitter,globalCall,globalDACall){
    globalEmitter.once(globalCall,operate)
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
    
    if(model.schema==null||!model.schema)
    {
        model.info="Invalid schema"
        model.emit(model.callBackRouter,model)
    }
    
    // validating the type of request 
    if(model.dbOpsType=="create"||model.dbOpsType=="read"||model.dbOpsType=="delete"||model.dbOpsType=="update")
    {       
            //setting up the data access layer
            global.emit(globalDataAccessCall,model)
            model.emit(model.dbOpsType,model);
    }
    
    else
    {
    // reply for out of scope request
            model.info="URL Not Valid, Use create/read/delete/update"
            model.emit(model.callBackRouter,model)
    }
}

// function for triggering and setting up the final response in the router
function postDBOperation(model){
    model.info=model.status;
    model.emit(model.callBackRouter,model)
}

// exports
module.exports=ServicePlan