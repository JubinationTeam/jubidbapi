'use strict'
// user-defined dependencies
var index=require('./../../models/schema/index.js');

// event names
const callbackAuthenticate="authenticate";
const callbackOperation="operation"
var globalDataAccessCall;

// global event emitter
var global;

// function to define pre and post db operation events
function ServicePlan(globalEmitter,globalCall,globalDACall){
    globalEmitter.on(globalCall,authenticate)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to authenticate user access
function authenticate(model)
{
        model.once("service",setupModelAndForwardForUserPermissions);
}

// setup model and forward it to data access to fetch user permissions
function setupModelAndForwardForUserPermissions(model){
        model.schema=index["User"];
        model.dbOpsType="readById";
        model.callbackService=callbackAuthenticate;
        model.id=model.req.body.key;
        model.once(callbackAuthenticate,grantOperator);
        global.emit(globalDataAccessCall,model)
        model.emit(model.dbOpsType,model)
}

// authentication logic
function grantOperator(model){
    var granted=false;
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
    if(!granted)
    {
        model.info="Access Not Granted!!";
        model.emit(model.callBackRouter,model);
    }
}
//Calling the required db operation
function doOperation(model){
        model.data=model.req.body.data;
        model.id=model.req.body.id;
        model.dbOpsType=model.params["ops"];
        model.callbackService=callbackOperation;
        model.once(callbackOperation,sendBackValidData);
        if(model.dbOpsType=="read"&&!model.data)
        {
            model.dbOpsType="readById";
        }
        global.emit(globalDataAccessCall,model)
        model.emit(model.dbOpsType,model);
}

//Calling back the controller
function sendBackValidData(model){
    model.info=model.status;
    model.emit(model.callBackRouter,model)
}

//exports 
module.exports=ServicePlan;
