'use strict'

//user-defined dependencies
var creator=require('./helper.js').httpBlockGetter;


//init variables
const callBackEventName="callbackRouter"
var global;
var url;
var validRequestEntities;
var averageTimeTaken=0;
var noOfRequests;

//functio to accept parameters required by the setup function
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
    //checks if the request url is valid or not
    if(validRequestEntities.includes(requestUrl)){
            forwardToService(req,res)
    }
    else{
            respond(res,{'data':"Invalid Request"});
    }
}

//function to call the required service
function forwardToService(req,res){
        //instantiating the model
        var model=creator(req,res);
        if(!model.req.body)
        {
                respond(res,{"data":"Body not present"});
        }
        else{
            model.callBackRouter=callBackEventName;

            //setup callback model event
            model.once(callBackEventName, (model)=>{
                model.removeAllListeners();
                respond(res,{'data':model.info});
            })

            //setup the rest of the model events at service layer
            var keys=Object.keys(req.params);
            for(var j=0;j<keys.length;j++){
                var value=req.params[keys[j]];
                global.emit(value,model);
            }

            //triggering service
            model.emit("service",model)
        }
    }

function respond(res,data){
    res.setHeader('Content-Type', 'application/json'); 
    res.send(JSON.stringify(data, null, 3));
    res.end();
}

//exports
module.exports.process=process;
module.exports.init=init;

