'use strict'

// event names
const callBackEventName='sendBackService';
const globalAuthServiceCall='authServiceCall';
const globalUserDataAccessCall='userDataAccessCall'

// global event emitter
var global;

// function to define the main service event operation
function authorizeService(globalEmitter){
    globalEmitter.on(globalAuthServiceCall,servicePlan)
    global=globalEmitter;
}

// function to define pre and post db operation events
function servicePlan(model){
    model.callbackService=callBackEventName;
    model.once('service', preDBOperation);
    model.once(callBackEventName,postDBOperation);
}

//triggering the required db operation based on the request
function preDBOperation(model){
    // validating the type of request 
    if(model.requestType=="create"||model.requestType=="read"||model.requestType=="delete"||model.requestType=="update")
    {
            //setting up the data access layer
            global.emit(globalUserDataAccessCall,model)
            model.emit(model.requestType,model);
    }
    else
    {
    // reply for out of scope request
            model.info="URL Not Valid, Use create/read/delete/update"
            model.emit(model.callbackRouter,model)
    }
}

// function for triggering and setting up the final response in the router
function postDBOperation(model){
    model.info=model.status;
    model.emit(model.callbackRouter)
}

// exports
module.exports=authorizeService