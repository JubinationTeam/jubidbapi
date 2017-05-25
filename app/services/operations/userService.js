'use strict'

//node dependencies
var jubiForLoop = require('jubi-for-loop');

// user-defined dependencies
var index=require('./../../models/schema/index.js');
var firstGuard=require('./../firstGuard.js');

// event names
const callbackAuthenticate="callbackAuthenticate";
const callbackOperation="callbackOperation"
var globalDataAccessCall;

// global event emitter
var global;

// function to instantiate
function init(globalEmitter,globalCall,globalDACall){
    globalEmitter.on(globalCall,setup)
    global=globalEmitter;
    globalDataAccessCall=globalDACall;
}

// function to authenticate user access
function setup(model)
{
    model.once('service',prepareToValidate);
}

// setup model and forward it to firstGuard function to validate the request body
function prepareToValidate(model){
    model.schema=model.req.body.schema;
    model.dbOpsType=model.params["ops"];
    model.pageNo=model.req.body.pageNo;
    model.data=model.req.body.data;
    model.id=model.req.body.key;
    authenticate(firstGuard(model))
}

//function the authenticate the user 
function authenticate(model){
    model.callBackFromDataAccess=callbackAuthenticate;
    model.schema=index["User"];
    if(model.req.body.key&&model.tag){
        model.id=model.req.body.key;
        model.dbOpsType="readById";
        model.once(callbackAuthenticate,grantOperator);
        global.emit(globalDataAccessCall,model)
        model.emit(model.dbOpsType,model)
    }
    else{
        if(!model.req.body.key){
            model.info+="Key required as well";
        }
        respond(model);
    }
}


// authentication logic
function grantOperator(model){
    if(model.status&&model.status.access){
        model.granted=false;
        model.dbOpsType=model.params["ops"];
        model.readLimit=model.status.maxEntries;
        model.id=model.req.body.id;
        model.schema=index[model.req.body.schema];
        jubiForLoop(model,model.status.access[model.dbOpsType],userOps,postGrantSendInvalidatedData)
    }
    else{
        model.info=model.status;
        respond(model);
    }
}


//function to interact with the database
function userOps(model,key){
     if(!model.granted){
            if(key==model.req.body.schema&&model.schema&&model.req.body.schema!="User")
            {   
                if(model.pageNo){
                    model.offset=(model.pageNo-1)*model.status.maxEntries;
                }
                model.callBackFromDataAccess=callbackOperation;
                model.once(callbackOperation,sendBackValidData);
                global.emit(globalDataAccessCall,model)
                model.emit(model.dbOpsType,model);
                model.granted=true;
            }    
     }

}

//Setup for calling back the controller when request is valid
function sendBackValidData(model){
    model.info=model.status;
    respond(model);
}
//function to setup for calling controller when the data in request body is not valid
function postGrantSendInvalidatedData(model){
    if(!model.granted)
    {
        model.info="Access Not Granted!!";
        respond(model);
    }
}

//Calling back the controller
function respond(model){
        model.emit(model.callBackRouter,model);
}

//exports 
module.exports=init;
