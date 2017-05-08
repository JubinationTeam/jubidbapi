'use strict'
// user-defined dependencies
var User=require('./../../models/schema/index.js').User;

// event names
const callBackEventName='sendBackService';
const globalDataAccessCall='dataAccessCall'

// global event emitter
var global;

// function to define the main service event operation
function ServicePlan(globalEmitter,globalCall){
    console.log("Service plan for "+globalCall+"created");
    globalEmitter.on(globalCall,operate)
    global=globalEmitter;
}

// function to define pre and post db operation events
function operate(model){
    model.callbackService=callBackEventName;
    model.once('service', preDBOperation);
    model.once(callBackEventName,postDBOperation);
}

//triggering the required db operation based on the request
function preDBOperation(model){
    var ops=model.params["ops"];
    model.schema=User;
    // validating the type of request 
    if(ops=="create"||ops=="read"||ops=="delete"||ops=="update")
    {       
            //setting up the data access layer
            global.emit(globalDataAccessCall,model)
            model.emit(ops,model);
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