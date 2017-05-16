'use strict'

//node dependencies
var jubiForLoop = require('jubi-for-loop');

//user-defined dependencies
const EventEmitter = require('events');

//init variables
var callBackEventName;
var global;
var url;
var validRequestEntities;
var noOfRequests=0;

//function to accept parameters required by the setup function
function init(initVar){
    global=initVar.globalEmitter;
    url=initVar.url;
    validRequestEntities=initVar.validRequestEntities;
    callBackEventName=initVar.callbackName;
}


//routing function
function process(app){
    app.post(url, instantiate);
    return app;
}


//function to instantiate the model
function instantiate(req,res){
    class Model extends EventEmitter {   }
    var model=new Model()
    model.setMaxListeners(6);
    model.req=req
    model.res=res
    model.params=req.params
    model.callBackRouter=callBackEventName;
    model.requestUrl="";
    var keys=Object.keys(model.params);
    new jubiForLoop(model,keys,(data,key)=>{data.requestUrl+=data.params[key]+"/"},validate)
   
}

//function to validate
function validate(model){
    if(!model.req.body)
    {
        model.info="Body not present"
        respond(model);
    }
    else if(validRequestEntities.includes(model.requestUrl)){
        model.once(callBackEventName, respond);
        var keys=Object.keys(model.req.params);
        new jubiForLoop(model,keys,(data,key)=>{
            if(!data.controllerFlag){
                global.emit(data.params[key],data);
                data.controllerFlag=true;
            }
    },(data)=>{data.emit("service",data)})
    }
    else{
        model.info="Invalid Request"
        respond(model);
    }
}

//function to respond back
function respond(model){
    model.removeAllListeners();
    if(noOfRequests==Number.MAX_SAFE_INTEGER){
        noOfRequests=0;
    }else{
        noOfRequests+=1;
    }
    console.log("served "+noOfRequests+" requests")
    model.res.setHeader('Content-Type', 'application/json'); 
    model.res.send(JSON.stringify({'data':model.info}, null, 3));
    model.res.end();
}

//exports
module.exports.process=process;
module.exports.init=init;

