  'use strict'

//user-defined dependencies
var creator=require('./helper.js').httpBlockGetter;
var globalEmitter=require('./../init.js').globalEmitter;

//Event Names (Constant)
const callBackEventName='callbackRouter';
const globalAuthServiceCall='authServiceCall';

//define the routes
function process(app){
    app.post('/user/:userOps', setupModelAndForward);
    return app;
}

//setting up the model and forwarding it to service
function setupModelAndForward(req,res){
    //create new model
    var model=creator(req,res)

    //setup model data
    model.requestType=req.params.userOps;
    model.callbackRouter=callBackEventName;
    
    //setup callback model event //last call in AuthHandler
    model.once(callBackEventName, (model)=>{model.res.send(model.info)})

    //setup the rest of the model events at service layer
    globalEmitter.emit(globalAuthServiceCall,model)

    //triggering the service event of model
    model.emit("service",model)
    
}

//exports
module.exports=process


 