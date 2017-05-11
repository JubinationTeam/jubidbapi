'use strict'

// event name
var globalCall;

// exports
module.exports=function(globalEmitter,global){
    globalCall=global
    console.log("global "+globalCall+" on")
    globalEmitter.on(globalCall,dataAccessPlan)
}
   
// catches events based on the request and executes the required db operation
function dataAccessPlan(model)
{           
            switch (model.dbOpsType)
                    {
                case "create" :
                            console.log("model "+model.dbOpsType+" once")
                            model.once("create", listenerCreate)
                            break;
                case "delete" :
                            console.log("model "+model.dbOpsType+" once")
                            model.once("delete", listenerDelete)
                            break;
                case "read" :
                            console.log("model "+model.dbOpsType+" once")
                            model.once("read", listenerReadByFilter)
                            break;
                case "update":
                            console.log("model "+model.dbOpsType+" once")
                            model.once("update", listenerUpdate)
                            break;
                case "readById":
                            console.log("model "+model.dbOpsType+" once")
                            model.once("readById", listenerReadById)
                            break;
                default:
                            model.status="Something went wrong";
                            console.log("model "+model.callbackService+" emit")
                            model.emit(model.callbackService,model);
            }
  }

// function to create a new user
function listenerCreate(model){
    var value=model.data;
    new model.schema(value).save(function(err, doc){
        if(err) 
        {
            model.status=err
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
    });
}

// function to delete a user by id
function listenerDelete(model){
    model.schema.findByIdAndRemove( model.id,function(err, doc){
        if(err) 
        {
            model.status=err
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
    });
}

// function to read user data by user's data
function listenerReadByFilter(model){

    var query=model.data;
    model.schema.find(query,function(err, doc){
        if(err) 
        {
            model.status=err
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
    });
}

// function to read user data by user's id
function listenerReadById(model){
    model.schema.findById(model.id,function(err, doc){
        if(err) 
        {
            model.status=err
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model)
        }
        else
        {   
            model.status=doc
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model)
        }
    });
}

//function to update user data
function listenerUpdate(model){
    model.schema.findByIdAndUpdate(model.id, { $set: model.data},function(err,doc){
        if(err) 
        {
            model.status=err
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
        else
        {
            model.status=doc
            console.log("model "+model.callbackService+" emit")
            model.emit(model.callbackService,model);
        }
        
    })
}
