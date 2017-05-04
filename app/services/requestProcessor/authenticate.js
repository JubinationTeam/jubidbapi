'use strict'

// event names
const callbackEventName="authenticateReadLogic";
const globalReqServiceCall='reqServiceCall';
const globalUserDataAccessCall='userDataAccessCall'

// global event emitter
var global;

// function to define pre and post db operation events
function authenticateService(globalEmitter){
    globalEmitter.on(globalReqServiceCall,authenticate)
    global=globalEmitter;
}

// function to authenticate user access
function authenticate(model)
{
        model.once("service",setupModelAndForwardForUserPermissions);
}

// setup model and forward it to data access to fetch user permissions
function setupModelAndForwardForUserPermissions(model){
        model.callbackService=callbackEventName;
        model.once(callbackEventName,grantOperator);
        global.emit(globalUserDataAccessCall,model)
        model.emit("readById",model)
}

// authentication logic
function grantOperator(model){
    var granted=false;
    for(var i=0;i<=model.status.access.length;i++)
    {
            //checks if the requested operation is allowed or not    
            if(model.status.access[i]==model.requestType)
            {   
                granted=true;
                console.log("Access Granted!!");
                model.info="Access Granted!!";
                model.emit(model.callBackRouter,model);
                break;
            }
    }
    if(!granted)
    {
        console.log("Sorry Access Not Granted");
        model.info="Access Not Granted!!";
        model.emit(model.callBackRouter,model);
    }
}
/////////////////////////////////////////////////////////////

//exports 
module.exports=authenticateService;
