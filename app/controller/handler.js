'use strict'

//user-defined dependencies
var da=require("../dataAccess/genericDataAccess.js")
const EventEmitter = require('events');


//init variables
const callBackEventName="callbackRouter"
var global;
var url;
var validRequestEntities;
var noOfRequests=0;

//function to accept parameters required by the setup function
function init(initVar){
    global=initVar.globalEmitter;
    url=initVar.url;
    validRequestEntities=initVar.validRequestEntities;
}


//routing function
function process(app){
    app.post(url, validate);
    return app;
}

//function to validate url's
function validate(req,res){
    var validity=false;
    var requestUrl="";
    var keys=Object.keys(req.params);
    for(var j=0;j<keys.length;j++){
        requestUrl+=req.params[keys[j]]+"/";
    }
    //instantiating the model
class Model extends EventEmitter {   }

    var model=new Model()
    model.setMaxListeners(6);
    model.req=req
    model.res=res
    model.params=req.params
    model.callBackRouter=callBackEventName;
    //checks if the request url is valid or not
    if(!model.req.body)
    {
        model.info="Body not present"
        respond(model);
    }
    else if(validRequestEntities.includes(requestUrl)){
        //setup callback model event
        model.once(callBackEventName, respond);

        //setup the rest of the model events at service layer
        var keys=Object.keys(req.params);
        for(var j=0;j<keys.length;j++){
            var value=req.params[keys[j]];
            global.emit(value,model);
        }

        //triggering service
        model.emit("service",model)
    }
    else{
        model.info="Invalid Request"
        respond(model);
    }
}


function respond(model){
    model.removeAllListeners();
    noOfRequests+=1;
    console.log("served "+noOfRequests+" requests")
    model.res.setHeader('Content-Type', 'application/json'); 
    model.res.send(JSON.stringify({'data':model.info}, null, 3));
    model.res.end();
}

//exports
module.exports.process=process;
module.exports.init=init;

