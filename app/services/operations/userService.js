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
    globalEmitter.on(globalCall,setup)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to authenticate user access
function setup(model)
{
    model.once("service",authenticate);
}

// setup model and forward it to data access to fetch user permissions
function authenticate(model){
    
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
    model.dbOpsType=model.params["ops"];
    if(model.status.access){
        for(var i=0;i<=model.status.access.length;i++)
        {
            model.schema=index[model.req.body.schema];
            //checks if the requested operation is allowed or not    
            if(model.status.access[i]==model.dbOpsType&&model.schema&&model.req.body.schema!="User")
            {   
                
                granted=true;
                model.data=model.req.body.data;
                model.id=model.req.body.id;
                model.callbackService=callbackOperation;
                if(model.dbOpsType=="read"&&!model.data)
                {
                    model.dbOpsType="readById";
                }
                
                model.once(callbackOperation,sendBackValidData);
                
                global.emit(globalDataAccessCall,model)
                model.emit(model.dbOpsType,model);

                break;
            }
        }
    }
    if(!granted)
    {
        model.info="Access Not Granted!!";
        model.emit(model.callBackRouter,model);
    }
}

//Calling back the controller
function sendBackValidData(model){
    model.info=model.status;
    model.emit(model.callBackRouter,model)
}

//exports 
module.exports=ServicePlan;
