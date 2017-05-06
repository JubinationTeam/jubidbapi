'use strict'

//user-defined dependencies
var creator=require('./helper.js').httpBlockGetter;
var globalEmitter=require('./../init.js').globalEmitter;

//event names
const callBackEventName="callbackRouter";

function demo(globalEmitter){
globalEmitter.on("callOpHandler",setupModelAndForward)
}

function setupModelAndForward(model){
        
        //new model been created
    
        //var model=creator(newModel.req,newModel.res)
        //const globalReqServiceCall=newModel.globalCall
        //setup model data
        //model.requestType=newModel.req.params.ops;
    
        model.callBackRouter=callBackEventName;
        
        const globalReqServiceCall=model.firstParam
        
        //setup callback model event
        model.once(callBackEventName, (model)=>{model.res.send(model.info)})
    
        ////setup the rest of the model events at service layer
        model.globalEmitter.emit(globalReqServiceCall,model)
    
        //triggering service
        model.emit("service",model)
    }

//exports
//.module.exports=process
module.exports.demo=demo;

