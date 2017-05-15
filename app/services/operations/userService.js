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
    model.limit=1;
    model.once(callbackAuthenticate,grantOperator);
    
    global.emit(globalDataAccessCall,model)
    model.emit(model.dbOpsType,model)

}
// authentication logic
function grantOperator(model){
    var granted=false;
    model.dbOpsType=model.params["ops"];
    if(model.status&&model.status.access){
        model.readLimit=model.status.maxEntries;
        for(var i=0;i<model.status.access[model.dbOpsType].length;i++)
        {
            model.schema=index[model.req.body.schema];
            //checks if the requested operation is allowed or not    
            
            if(model.status.access[model.dbOpsType][i]==model.req.body.schema&&model.schema&&model.req.body.schema!="User")
            {   
               
                
                granted=true;
                model.data=model.req.body.data;
                model.id=model.req.body.id;
                model.callbackService=callbackOperation;
                if(model.dbOpsType=="read")
                {
                    if(model.data){
                        model.pageNo=model.req.body.pageNo;
                        //code for pagination
                        if(model.pageNo){
                            if(model.pageNo==1){
                                model.pageNo=0
                            }
                            else{
                                model.pageNo=(model.pageNo-1)*model.status.maxEntries;
                            }
                        }
                    }
                    else{
                        model.dbOpsType="readById";
                    }
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
