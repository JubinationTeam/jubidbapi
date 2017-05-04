'use strict'

//user-defined dependencies
var creator=require('./helper.js').httpBlockGetter;
var globalEmitter=require('./../../init.js').globalEmitter;

//event names
const callBackEventName="callbackRouter";
const globalReqServiceCall='reqServiceCall'

//defining routes
function process(app){
        app.post('/do/:ops', setupModelAndForward);
        return app;
}

function setupModelAndForward(req,res){
        //new model been created
        var model=creator(req,res)
        
        //setup model data
        model.requestType=req.params.ops;
        model.callBackRouter=callBackEventName;
        
        //setup callback model event
        model.once(callBackEventName, (model)=>{model.res.send(model.info)})
    
        ////setup the rest of the model events at service layer
        globalEmitter.emit(globalReqServiceCall,model)
    
        //triggering service
        model.emit("service",model)
    }

//exports
module.exports=process

