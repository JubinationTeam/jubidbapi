'use strict'
// user-defined dependencies
var index=require('./../../models/schema/index.js');

// event names
const callbackAuthenticate="callbackAuthenticate";
const callbackOperation="callbackOperation"
var globalDataAccessCall;

// global event emitter
var global;

// function to define pre and post db operation events
function ServicePlan(globalEmitter,globalCall,globalDACall){
    console.log("global "+globalCall+" on")
    globalEmitter.on(globalCall,authenticate)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to authenticate user access
function authenticate(model)
{
        console.log("model service once")
        model.once("service",setupModelAndForwardForUserPermissions);
}

// setup model and forward it to data access to fetch user permissions
function setupModelAndForwardForUserPermissions(model){
        model.schema=index["User"];
        model.dbOpsType="readById";
        model.callbackService=callbackAuthenticate;
        model.id=model.req.body.key;
        console.log("model "+callbackAuthenticate+" once")
        model.once(callbackAuthenticate,grantOperator);
        console.log("global "+globalDataAccessCall+" emit")
        global.emit(globalDataAccessCall,model)
        console.log("model "+model.dbOpsType+" emit")
        model.emit(model.dbOpsType,model)
}

// authentication logic
function grantOperator(model){
    var granted=false;
    model.dbOpsType=model.params["ops"];
    if(model.status.access){
        for(var i=0;i<=model.status.access.length;i++)
        {
            model.schema=index[model.req.body.schema];
            //checks if the requested operation is allowed or not    
            if(model.status.access[i]==model.dbOpsType&&model.schema!=null&&model.schema&&model.schema!="User")
            {   
                granted=true;
                doOperation(model);
                break;
            }
        }
    }
    if(!granted)
    {
        model.info="Access Not Granted!!";
        console.log("model "+model.callBackRouter+" emit")
        model.emit(model.callBackRouter,model);
    }
}
//Calling the required db operation
function doOperation(model){
        model.data=model.req.body.data;
        model.id=model.req.body.id;
        model.callbackService=callbackOperation;
        console.log("model "+callbackOperation+" once")
        model.once(callbackOperation,sendBackValidData);
        if(model.dbOpsType=="read"&&!model.data)
        {
            model.dbOpsType="readById";
        }
        console.log("global "+globalDataAccessCall+" emit")
        global.emit(globalDataAccessCall,model)
        console.log("model "+model.dbOpsType+" emit")
        model.emit(model.dbOpsType,model);
}

//Calling back the controller
function sendBackValidData(model){
    model.info=model.status;
    console.log("model "+model.callBackRouter+" emit")
    model.emit(model.callBackRouter,model)
}

//exports 
module.exports=ServicePlan;
